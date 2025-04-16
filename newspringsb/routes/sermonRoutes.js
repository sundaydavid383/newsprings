const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const filePath = path.join(__dirname, '../data/sermonData.json');

// UPDATE sermon by ID
router.post('/update-sermon-configs', (req, res) => {
  const { id, preacher, description } = req.body;
  console.log(req.body)

  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    let sermons = JSON.parse(rawData);

    const index = sermons.findIndex((sermon) => sermon.id === id);
    if (index === -1) {
      console.error('Sermon not found with ID ')
      return res.status(404).json({ error: 'Sermon not found with ID ' + id });
    }

    sermons[index] = { id, preacher, description };
    fs.writeFileSync(filePath, JSON.stringify(sermons, null, 2), 'utf-8');

    res.json(sermons);
  } catch (error) {
    console.error('Error updating sermon config:', error);
    res.status(500).json({ error: 'Failed to update sermon config' });
  }
});

// Optional: GET all configs
router.get('/sermon-configs', (req, res) => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const configs = JSON.parse(data);
    res.json(configs);
  } catch (error) {
    console.error("Failed to read sermonsData.json:", error);
    res.status(500).json({ error: "Failed to load sermon configs" });
  }
});

module.exports = router;