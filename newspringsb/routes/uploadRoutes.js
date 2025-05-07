const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer"); // your multer config
const { uploadStory } = require("../controller/uploadController");

router.post("/uploading-story", upload.single("video"), uploadStory);

module.exports = router;