const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const Testimony = require("./testimonyModel");
const { default: mongoose } = require("mongoose");

// Express application
const app = express();
console.log("password:", process.env.PASSWORD)

// Middleware
app.use(express.json());
app.use(cors());

// Initializing multer
const storage = multer.diskStorage({
  destination: "uploading-story/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files are allowed"), false);
    }
    cb(null, true);
  },
});

// OAuth2 Client setup
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Route to handle the OAuth2 callback
app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    res.send("You are now authorized! You can close this window.");
  } catch (error) {
    console.error("Error exchanging code for tokens:", error);
    res.status(500).send("Error during authentication");
  }
});

async function refreshAccessTokenIfNeeded() {
  const refreshToken = process.env.REFRESH_TOKEN;
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  const currentToken = oauth2Client.credentials.access_token;
  if (currentToken) {
    try {
      const response = await oauth2Client.getAccessToken();
      if (response.token) {
        oauth2Client.setCredentials({ access_token: response.token });
      }
    } catch (err) {
      console.error("Error refreshing access token:", err);
    }
  }
}
app.get("/getting-story", async (req, res) => {
  try {
    if (req.query.id && !mongoose.Types.ObjectId.isValid(req.query.id)) {
      return res.status(400).json({ success: false, error: "Invalid ID format" });
    }

    if (req.query.id) {
      const data = await Testimony.findOne({ _id: req.query.id });
      if (!data) {
        return res.status(404).json({ success: false, error: "Story not found" });
      }
      console.log("story data:", data);
      return res.status(200).json({ success: true, data });
    }

    const data = await Testimony.find(); // optionally add .sort()
    console.log("story data:", data);
    return res.status(200).json({ success: true, data });
    
  } catch (err) {
    console.error("unable to fetch data from the database", err);
    return res
      .status(500)
      .json({ success: false, error: "Unable to fetch data from the database" });
  }
});



app.put("/update-story", async (req, res) => {
 const {
     _id,
    image,
    name,
    title,
    testimony,
    scriptureReference,
    testimonyCategory,
    followUpAction,
    impact,
    lessonLearned,
    prayerRequest,
    churchDetails,
  } = req.body;

  const video = req.file;
  if(!video){
    console.log("no video specifie during update")
    throw new Error("no video specifie during update");
  }
  try {
    await refreshAccessTokenIfNeeded();
    const access_token = oauth2Client.credentials.access_token;
    oauth2Client.setCredentials({ access_token });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const videoPath = video.path;

    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: title,
          description: testimony.slice(0, 200),
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    // Video uploaded successfully to YouTube
    const storyData = {
      video: response?.data?.id, // YouTube video ID
      image,
      name,
      date:new Date().toLocaleDateString("en-GB"),
      title,
      testimony,
      scriptureReference,
      testimonyCategory,
      followUpAction,
      impact,
      lessonLearned,
      prayerRequest,
      churchDetails,
    };

    const updatedStory = await Testimony.updateOne(
      { _id: _id },
      { $set: storyData }
    );

    // Clean up: Delete the video file from the server after uploading it
    fs.unlink(video.path, (err) => {
      if (err) {
        console.error("Error deleting the video file:", err);
      } else {
        console.log("Video file deleted successfully");
      }
    });

    return res.status(200).json({
      success: true,
      videoId: response.data.id,
      message: "Successfully updated the video to YouTube",
      formData: req.body,
    });
  } 
  catch (error) {
    console.error("Error updating video to YouTube:", error.message);
   

    if (!video) {
      console.log("No video ID provided, keeping existing video.");
    }

    const result = await Testimony.findOne({_id:_id});

    if (!result) {
      return res.status(404).json({ success: false, data: "Story not found" });
    }

    const storyData = {
      image,
      name,
      date: new Date().toLocaleDateString("en-GB"),
      title,
      testimony,
      scriptureReference,
      testimonyCategory,
      followUpAction,
      impact,
      lessonLearned,
      prayerRequest,
      churchDetails,
    };

    const updatedStory = await Testimony.updateOne(
      { _id: _id },
      { $set: storyData }
    );

    return res.status(200).json({
      success: true,
      data: "Story updated successfully",
      updatedStory,
    });
  } 
});

app.delete("/delete-story", async (req, res) => {
  try {
    const { id } = req.query;

    if ( !id || typeof id !== "string") {
      return res
        .status(400)
        .json({ success: false, data: "Invalid user credentials" });
    }
   const result = await Testimony.deleteOne({_id:id})

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, data: "Story not found"})   
     }
    return res
      .status(200)
      .json({ success: true, data: "Story deleted successfully", deletedData:result});
  } catch (error) {
    console.error("an Error ocurred while deleting data:", error);
    return res.status(500).json({success:false, data:"there was an error deleting user"})
  }
});

app.post("/uploading-story", upload.single("video"), async (req, res) => {
  const {
    image,
    name,
    title,
    testimony,
    scriptureReference,
    testimonyCategory,
    followUpAction,
    impact,
    lessonLearned,
    prayerRequest,
    churchDetails,
  } = req.body;

  const video = req.file;

  try {
    await refreshAccessTokenIfNeeded();
    const access_token = oauth2Client.credentials.access_token;
    oauth2Client.setCredentials({ access_token });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const videoPath = video.path;

    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: title,
          description: testimony.slice(0, 200),
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: fs.createReadStream(videoPath),
      },
    });

    // Video uploaded successfully to YouTube
    const storyData = {
      video: response?.data?.id, // YouTube video ID
      image,
      name,
      date:new Date().toLocaleDateString("en-GB"),
      title,
      testimony,
      scriptureReference,
      testimonyCategory,
      followUpAction,
      impact,
      lessonLearned,
      prayerRequest,
      churchDetails,
    };

    const story = await Testimony.create(storyData);

    // Clean up: Delete the video file from the server after uploading it
    fs.unlink(video.path, (err) => {
      if (err) {
        console.error("Error deleting the video file:", err);
      } else {
        console.log("Video file deleted successfully");
      }
    });

    return res.status(200).json({
      success: true,
      videoId: response.data.id,
      message: "Successfully uploaded the video to YouTube",
      formData: req.body,
    });
  } 
  catch (error) {
    console.error("Error uploading video to YouTube:", error.message);
    const storyData = {
      image,// YouTube video ID
      name,
      date:new Date().toLocaleDateString("en-GB"),
      title,
      testimony,
      scriptureReference,
      testimonyCategory,
      followUpAction,
      impact,
      lessonLearned,
      prayerRequest,
      churchDetails,
    };

    const story = await Testimony.create(storyData);

    // Clean up: Delete the video file from the server after uploading it
    fs.unlink(video.path, (err) => {
      if (err) {
        console.error("Error deleting the video file:", err);
      } else {
        console.log("Video file deleted successfully");
      }
    });

    return res.status(200).json({
      success: true,
      videoId: "no video uploaded",
      message: "We uploaded it without using the video",
      formData: req.body,
    });
  }
});
app.post("/diagnose", (req, res) => {
  const { symptoms } = req.body;
  const malariaSymptoms = ["Fever", "Chills", "Sweating", "Headache"];

  const matches = symptoms.filter((symptom) =>
    malariaSymptoms.includes(symptom)
  );

  if (matches.length >= 3) {
    res.json({ message: "High chance of malaria. Visit a doctor!" });
  } else {
    res.json({ message: "Unlikely malaria, but monitor your symptoms." });
  }
});

// Initialize MongoDB connection and start server
const connectDB = async () => {
  try {
  
    const mongoURL = `mongodb+srv://sundayudoh383:${process.env.PASSWORD}@newspringchurchdb.m83dh.mongodb.net/?retryWrites=true&w=majority&appName=newspringChurchDB`;
    await mongoose.connect(mongoURL);
    console.log("connected to mongoose successfully");

    app.listen(4000, () => console.log("Server running on port 4000"));
  } catch (error) {
    console.error("an error occured unable to connect mongoose", error);
  }
};

connectDB();
