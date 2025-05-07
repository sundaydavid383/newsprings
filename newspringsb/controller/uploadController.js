const uploadVideoToYouTube = require("../services/youtubeUploader");
const deleteFile = require("../utils/deleteFile");
const TestimonyModelFactory = require("../models/testimonyModel");
const path = require("path");

exports.uploadStory = async (req, res) => {
  const connection = req.app.get("mongooseConnection"); // Assuming you're passing it
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

  const storyData = {
    image,
    validated: validated === "true", // If it's sent as a string
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

  try {
    if (video) {
      const videoId = await uploadVideoToYouTube(video.path, title, testimony.slice(0, 200));
      storyData.video = videoId;
    }

    const story = await TestimonyModel.create(storyData);
    if (video) deleteFile(video.path);

    return res.status(200).json({
      success: true,
      videoId: storyData.video || "no video uploaded",
      message: video ? "Successfully uploaded the video to YouTube" : "Uploaded without using the video",
      formData: req.body,
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    if (video) deleteFile(video.path);

    await TestimonyModel.create(storyData);

    return res.status(200).json({
      success: true,
      videoId: "no video uploaded",
      message: "We uploaded it without using the video",
      formData: req.body,
    });
  }
};