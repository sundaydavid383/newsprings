const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Path to the JSON file
const churchInfoPath = path.join(__dirname, '../data/contact.json');

// Function to read the church info from the JSON file
function readChurchInfo() {
  if (!fs.existsSync(churchInfoPath)) {
    return {}; // Return an empty object if the file doesn't exist
  }

  const data = fs.readFileSync(churchInfoPath, 'utf8');
  return JSON.parse(data || '{}');
}

// Endpoint to get church info
router.get('/contact', (req, res) => {
  try {
    const churchInfo = readChurchInfo();
    res.status(200).json({
      success: true,
      message: 'Church info retrieved successfully.',
      data: churchInfo
    });
  } catch (error) {
    console.error('Error reading church info:', error);
    res.status(500).json({
      success: false,
      message: 'There was an error retrieving the church info.'
    });
  }
});

module.exports = router;