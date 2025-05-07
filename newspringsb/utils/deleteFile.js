const fs = require("fs");

function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting the video file:", err);
    } else {
      console.log("Video file deleted successfully");
    }
  });
}

module.exports = deleteFile;