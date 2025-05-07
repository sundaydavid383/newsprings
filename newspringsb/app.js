const express = require("express");
const cors = require("cors");
const { google } = require("googleapis");
const multer = require("multer");
const path = require("path")
const fs = require("fs");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const connectDatabases = require("./db");
const sendEmail = require("./utils/sendEmail")
const { default: mongoose } = require("mongoose");
const nodemailer = require("nodemailer")
const uploadRoutes = require("./routes/uploadRoutes.js");

//app initialization
const app = express();

// Middleware
app.use(express.json({ limit: '10mb' })); // adjust size as needed
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use((req, res, next) => {
  console.log(`🛎️ [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (req.method !== 'GET') {
    console.log('📦 Request Body:', req.body);
  }
  next();
});


//app password = anwf blsl unlp jixo
// Express application

console.log("password:", process.env.PASSWORD);
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("APP_PASSWORD:", process.env.APP_PASSWORD);


//email transporter
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user:process.env.EMAIL_USER,
        pass:process.env.APP_PASSWORD,
    },
});



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

const startServer = async () => {
  try {
    // Connect to both databases
    const { testimoniesConnection, registrationsConnection } =
      await connectDatabases();

    // Import models for each database connection
    const TestimonyModel = require("./models/testimonyModel")(
      testimoniesConnection
    );
    const Registration = require("./models/registrationModel")(
      registrationsConnection
    );
    function calculateAge(dob) {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    // ========================Prayer and fasting details==================
    const prayerRoute = require('./routes/prayerandFasting.js');
   app.use('/api/prayer-and-fasting', prayerRoute);

    //============================= hero section details ============
    const heroRoute = require("./routes/heroRoutes.js")
    app.use("/api", heroRoute)

    //===========================water baptisim page fetch =====================
    const baptismRoute = require("./routes/waterBaptisim");
      app.use("/api/events", baptismRoute);
    
      //=========================change and send contact info ==============
    const contactRoutes = require('./routes/contact.js'); 
      app.use('/api', contactRoutes);

    //=========================send otp==============
    
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const {setOtp, getOtp, deleteOtp} = require("./routes/otpStore.js") 
  
app.post('/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOtp();
    const expires = Date.now() + 5 * 60 * 1000;

    setOtp(email, { otp, expires });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
      });
    } catch (mailError) {
      console.error("Error during email sending:", mailError);
      return res.status(500).json({ success: false, message: "Error sending email" });
    }

    res.json({ success: true, message: 'OTP sent' });
  } catch (error) {
    console.error("General error:", error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});


app.post("/verify-otp", (req, res)=>{
  try {
    const {email, otp} = req.body;
    const stored = getOtp(email);

    if(!stored)return res.status(400).json({success:false, message:'No OTP'})
    if(stored.expires < Date.now()) return res.status(400).json({ success: false, message: 'OTP expired' });
    if(stored.otp !== otp) return res.status(400).json({ success: false, message: 'Invalid OTP' })
    
    deleteOtp(email);
    res.json({ success: true, message: 'OTP verified. User signed in!' })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    res.status(500).json({ success: false, message: 'An error occurred during OTP verification.' });
  }
})
    //==================sermon details================
    const sermonRoutes = require('./routes/sermonRoutes');
    app.use('/api', sermonRoutes);

    
    //===================contact form===============
    const contactFormRoutes  = require("./routes/contactForm.js")
    app.use('/api/contact', contactFormRoutes)

    //=================admin message===========
    const adminMessageRoute = require("./routes/adminMessage");
    app.use("/api", adminMessageRoute);
   

    //===================admin servicetext==============
    const serviceTextRoute = require("./routes/serviceText")
    app.use("/api", serviceTextRoute);

    //===================validate admin===========
    app.post("/verify/admin", async (req, res) => {
      const { password } = req.body;
 
    
      if (!password) {
        return res.status(400).json({ success: false, message: "Password is required." });
      }
      try {
        const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD);
    
        if (!isMatch) {
          return res.status(401).json({ success: false, message: "Unauthorized. Incorrect password." });
        }
    
        return res.status(200).json({ success: true, message: "Admin verified." });
      } catch (err) {
        console.error("Error verifying admin password:", err);
        return res.status(500).json({ success: false, message: "Server error." });
      }
    });



    // ============ Broadcast endpoint ==========
      app.post("/admin/broadcast", async (req,res) => {
        const {message} = req.body

        try {
           const users = await Registration.find({}, "email")
           const emailPromises = users.map((user)=>
          sendEmail(user.email, "Message from Admin", String(message)
          ))
          await Promise.all(emailPromises)

          res.json({success:true, message:"Message sent to all users"});
        } catch (error) {
          console.error(error);
          return res.status(500).json({success:false, message:"Failed to send emails"})
          
        }
      })

    // ========== Login Endpoint =============
    app.post("/api/login", async (req, res) => {
      const { email, password } = req.body;

      try {
        console.log(req.body);
        // Find user by email
        const user = await Registration.findOne({ email: String(email) });

        if (!user) {
          console.error("Invalid email or password.");
          return res
            .status(401)
            .json({ success: false, message: "Unable to find user." });
        } else {
          // Compare passwords
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            console.error("Invalid email or password.");
            return res
              .status(401)
              .json({ success: false, message: "Invalid email or password." });
          }
          console.log("login successfully")
          return res.status(200).json({
            success: true,
            message: "Login successful!",
            user: {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              age: user.age,
              phone: user.phone,
              gender: user.gender,
              occupation: user.occupation,
              hearAboutUs: user.hearAboutUs,
              interest: user.interest,
              prayerRequest: user.prayerRequest,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
            },
          });
        }
      } catch (error) {
        console.error("Login error:", error);
        res
          .status(500)
          .json({ success: false, message: "An error occurred during login." });
      }
    });



    // =============== checking email==========================
    app.post("/check-email", async (req,res)=>{
      const {email} = req.body
      const existingUser = await Registration.findOne({email})
       if(existingUser){
        return res.status(400).json({success:false, message:"Email already exists"})
       }
       return res.status(200).json({success:true})
    })


    // ======== Register Endpoint (with hashed password) ===========
    app.post("/register", async (req, res) => {
      try {
        const {
          firstName,
          lastName,
          email,
          password,
          dob,
          phone,
          gender,
          occupation,
          hearAboutUs,
          interest,
          prayerRequest,
        } = req.body;
       
        const existingUser = await Registration.findOne({ email });
       if (existingUser) {
             return res.status(400).json({ success: false, message: "Email already exists" });
          }
        // Hash the password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const age = calculateAge(dob);
    
        const user = new Registration({
          firstName: String(firstName),
          lastName: String(lastName),
          email: String(email),
          password: hashedPassword,
          age: String(age),
          phone: String(phone),
          gender: String(gender),
          occupation: String(occupation),
          hearAboutUs: String(hearAboutUs),
          interest: String(interest),
          prayerRequest: String(prayerRequest),
        });
    
        const currentUser = await user.save();
    
        // Remove password before sending back the user
        const userWithoutPassword = currentUser.toObject();
        delete userWithoutPassword.password;
    
        res.status(201).json({
          success: true,
          message: "Registration successful!",
          user: userWithoutPassword,
        });
      } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
          success: false,
          message: "There was an error during registration.",
        });
      }
    });

    // ================== Fetch all users ==================
app.get("/users", async (req, res) => {
  try {
    const users = await Registration.find();

    if (!users.length) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    // Remove password from all users before sending the data
    const usersWithoutPassword = users.map(user => {
      const userObj = user.toObject();
      delete userObj.password;
      return userObj;
    });

    res.status(200).json({
      success: true,
      users: usersWithoutPassword,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      success: false,
      message: "There was an error fetching the users.",
    });
  }
});

// ================== Fetch user by email ==================
app.get("/user/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await Registration.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Remove password before sending back the user data
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      message: "User fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "There was an error fetching the user.",
    });
  }
});

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
          return res
            .status(400)
            .json({ success: false, error: "Invalid ID format" });
        }

        if (req.query.id) {
          const data = await TestimonyModel.findOne({ _id: req.query.id });
          if (!data) {
            return res
              .status(404)
              .json({ success: false, error: "Story not found" });
          }
          console.log("story data:", data);
          return res.status(200).json({ success: true, data });
        }

        const data = await TestimonyModel.find(); // optionally add .sort()
        console.log("story data:", data);
        return res.status(200).json({ success: true, data });
      } catch (err) {
        console.error("unable to fetch data from the database", err);
        return res
          .status(500)
          .json({
            success: false,
            error: "Unable to fetch data from the database",
          });
      }
    });

    app.put("/update-story", async (req, res) => {
      const {
        _id,
        image,
        validated,
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
      if (!video) {
        console.log("no video specifie during update");
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
          validated,
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

        const updatedStory = await TestimonyModel.updateOne(
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
      } catch (error) {
        console.error("Error updating video to YouTube:", error.message);

        if (!video) {
          console.log("No video ID provided, keeping existing video.");
        }

        const result = await TestimonyModel.findOne({ _id: _id });

        if (!result) {
          return res
            .status(404)
            .json({ success: false, data: "Story not found" });
        }

        const storyData = {
          image,
          name,
          validated,
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

        const updatedStory = await TestimonyModel.updateOne(
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

        if (!id || typeof id !== "string") {
          return res
            .status(400)
            .json({ success: false, data: "Invalid user credentials" });
        }
        const result = await TestimonyModel.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, data: "Story not found" });
        }
        return res
          .status(200)
          .json({
            success: true,
            data: "Story deleted successfully",
            deletedData: result,
          });
      } catch (error) {
        console.error("an Error ocurred while deleting data:", error);
        return res
          .status(500)
          .json({ success: false, data: "there was an error deleting user" });
      }
    });

    // app.post("/uploading-story", upload.single("video"), async (req, res) => {
    //   const {
    //     image,
    //     validated,
    //     name,
    //     title,
    //     testimony,
    //     scriptureReference,
    //     testimonyCategory,
    //     followUpAction,
    //     impact,
    //     lessonLearned,
    //     prayerRequest,
    //     churchDetails,
    //   } = req.body;

    //   const video = req.file;

    //   try {
    //     await refreshAccessTokenIfNeeded();
    //     const access_token = oauth2Client.credentials.access_token;
    //     oauth2Client.setCredentials({ access_token });

    //     const youtube = google.youtube({
    //       version: "v3",
    //       auth: oauth2Client,
    //     });

    //     const videoPath = video.path;

    //     const response = await youtube.videos.insert({
    //       part: "snippet,status",
    //       requestBody: {
    //         snippet: {
    //           title: title,
    //           description: testimony.slice(0, 200),
    //         },
    //         status: {
    //           privacyStatus: "public",
    //         },
    //       },
    //       media: {
    //         body: fs.createReadStream(videoPath),
    //       },
    //     });

    //     // Video uploaded successfully to YouTube
    //     const storyData = {
    //       video: response?.data?.id, // YouTube video ID
    //       image,
    //       validated,
    //       name,
    //       date: new Date().toLocaleDateString("en-GB"),
    //       title,
    //       testimony,
    //       scriptureReference,
    //       testimonyCategory,
    //       followUpAction,
    //       impact,
    //       lessonLearned,
    //       prayerRequest,
    //       churchDetails,
    //     };

    //     const story = await TestimonyModel.create(storyData);

    //     // Clean up: Delete the video file from the server after uploading it
    //     fs.unlink(video.path, (err) => {
    //       if (err) {
    //         console.error("Error deleting the video file:", err);
    //       } else {
    //         console.log("Video file deleted successfully");
    //       }
    //     });

    //     return res.status(200).json({
    //       success: true,
    //       videoId: response.data.id,
    //       message: "Successfully uploaded the video to YouTube",
    //       formData: req.body,
    //     });
    //   } catch (error) {
    //     console.error("Error uploading video to YouTube:", error.message);
    //     const storyData = {
    //       image, // YouTube video ID
    //       validated,
    //       name,
    //       date: new Date().toLocaleDateString("en-GB"),
    //       title,
    //       testimony,
    //       scriptureReference,
    //       testimonyCategory,
    //       followUpAction,
    //       impact,
    //       lessonLearned,
    //       prayerRequest,
    //       churchDetails,
    //     };

    //     const story = await TestimonyModel.create(storyData);

    //     // Clean up: Delete the video file from the server after uploading it
    //     fs.unlink(video.path, (err) => {
    //       if (err) {
    //         console.error("Error deleting the video file:", err);
    //       } else {
    //         console.log("Video file deleted successfully");
    //       }
    //     });

    //     return res.status(200).json({
    //       success: true,
    //       videoId: "no video uploaded",
    //       message: "We uploaded it without using the video",
    //       formData: req.body,
    //     });
    //   }
    // });

    app.post("/diagnose", (req, res) => {
      try {
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
      } catch (error) {
        console.error("they is an error dignosing");
      }
    });

    app.use("/api", uploadRoutes);

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server failed to start because DB connection failed.", err);
  }
};

startServer();
