const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/serviceText.json");

// Ensure file exists with default text
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify({ description: "" }, null, 2));
}

// POST: update the service description
router.post("/service-description", (req, res) => {
  const { description } = req.body;

  if (!description || description.trim() === "") {
    return res.status(400).json({ success: false, message: "Description is empty" });
  }

  try {
    const newData = { description, time: new Date().toISOString() };
    fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
    res.json({ success: true, message: "Service description updated", data: newData });
  } catch (error) {
    console.error("Failed to write file:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET: fetch the service description
router.get("/service-description", (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to read file" });
  }
});

module.exports = router;