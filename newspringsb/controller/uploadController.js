const fs = require("fs");
const path = require("path");
const uploadVideoToYouTube = require("../services/youtubeUploader");
const deleteFile = require("../utils/deleteFile");
const TestimonyModelFactory = require("../models/testimonyModel");

// Function to save base64 image to file
function saveBase64Image(base64String, folder = "uploading-story/images") {
  // Ensure folder exists
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image string");
  }

  const ext = matches[1].split("/")[1]; // e.g., image/jpeg => jpeg
  const buffer = Buffer.from(matches[2], "base64");
  const filename = `${Date.now()}.${ext}`;
  const filePath = path.join(folder, filename);
  fs.writeFileSync(filePath, buffer);

  return `images/${filename}`; // This is the relative URL path you'll store
}

// Main upload handler
exports.uploadStory = async (req, res) => {
  const connection = req.app.get("mongooseConnection");
  const TestimonyModel = TestimonyModelFactory(connection);

  const {
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

  try {
    // Convert and store base64 image
    let savedImagePath = null;
    if (image) {
      savedImagePath = saveBase64Image(image); // Returns relative path like "images/1715087319283.jpeg"
    }

    const storyData = {
      image: savedImagePath,
      validated: validated === "true",
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

    // Upload video if present
    if (video) {
      const videoId = await uploadVideoToYouTube(
        video.path,
        title,
        testimony.slice(0, 200)
      );
      storyData.video = videoId;
    }

    const story = await TestimonyModel.create(storyData);
    if (video) deleteFile(video.path);

    return res.status(200).json({
      success: true,
      videoId: storyData.video || "no video uploaded",
      imagePath: storyData.image || "no image uploaded",
      message: video
        ? "Successfully uploaded the video to YouTube"
        : "Uploaded without using the video",
      formData: req.body,
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    if (video) deleteFile(video.path);

    return res.status(500).json({
      success: false,
      message: "An error occurred during upload",
      error: error.message,
    });
  }
};