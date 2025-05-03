const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '../data/prayerAndFasting.json');

// GET prayer & fasting content
router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Failed to load data.' });
  }
});

// PUT (update) prayer & fasting content
router.put('/', (req, res) => {
  try {
    const updatedData = req.body;
    fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2));
    res.json({ message: 'Content updated successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save data.' });
  }
});

module.exports = router;