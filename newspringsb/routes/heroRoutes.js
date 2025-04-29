const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/heroData.json");

// Ensure file exists with default text
// if (!fs.existsSync(filePath)) {
//   fs.writeFileSync(filePath, JSON.stringify({ description: "" }, null, 2));
// }

// POST: update the hero sections
router.post("/hero-sections", (req, res) => {
  const { sections } = req.body;

  if (!sections || !Array.isArray(sections)) {
    return res.status(400).json({ success: false, message: "Invalid sections data" });
  }

  try {
    fs.writeFileSync(filePath, JSON.stringify( sections , null, 2));
    return res.json({ success: true, message: "Hero sections updated", data: sections });
  } catch (error) {
    console.error("Failed to write file:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// GET: fetch the service description
router.get('/hero-sections', (req, res) => {
  try {
    if(!filePath || filePath.length <= 0){
      res.json({success:false, message:"error reading file"});
    }
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return res.json({ sections: data });
  } catch (error) {
    res.json({success:false, message:"error fetching data", data:fs.readFileSync(filePath, "utf8")});
  }
  
  });
  

module.exports = router;