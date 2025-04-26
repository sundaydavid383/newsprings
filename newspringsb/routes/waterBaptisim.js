const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const dataFile = path.join(__dirname, '../data/baptismEvent.json');
const registrantsFile = path.join(__dirname, '../data/baptismRegistrants.json');

// Get baptism event details
router.get('/baptism', (req, res) => {
  try {
    const raw = fs.readFileSync(dataFile, 'utf8');
    const eventData = JSON.parse(raw);
    res.json({ success: true, event: eventData });
  } catch (error) {
    console.error('Error reading baptism event file:', error);
    res.status(500).json({ success: false, message: 'Could not load event data' });
  }
});

// Get all baptism registrants
router.get('/baptism/registrants', (req, res) => {
  try {
    const raw = fs.readFileSync(registrantsFile, 'utf8');
    const registrants = JSON.parse(raw);
    res.json({ success: true, registrants: registrants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Could not read registrants' });
  }
});

// Add a new baptism registrant
router.post('/baptism/register', (req, res) => {
  const newRegistrant = req.body;  // Expecting the registrant data to be passed here

  try {
    const raw = fs.readFileSync(registrantsFile, 'utf8');
    const registrants = JSON.parse(raw);

    // Add the new registrant to the list
    registrants.push(newRegistrant);

    // Save the updated list back to the file
    fs.writeFileSync(registrantsFile, JSON.stringify(registrants, null, 2));

    res.json({ success: true, message: 'Registrant added successfully', registrant: newRegistrant });
  } catch (err) {
    console.error('Error adding registrant:', err);
    res.status(500).json({ success: false, message: 'Error adding registrant' });
  }
});

// Update a baptism registrant by index
router.put('/baptism/register/:index', (req, res) => {
  const index = parseInt(req.params.index);
  const updateData = req.body;  // New data for updating the registrant

  try {
    const raw = fs.readFileSync(registrantsFile, 'utf8');
    const registrants = JSON.parse(raw);

    if (index < 0 || index >= registrants.length) {
      return res.status(404).json({ success: false, message: 'Baptism registrant not found' });
    }

    // Update the registrant data
    registrants[index] = { ...registrants[index], ...updateData };

    // Save the updated list
    fs.writeFileSync(registrantsFile, JSON.stringify(registrants, null, 2));

    res.json({ success: true, message: 'Registrant updated', registrant: registrants[index] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error updating registrant' });
  }
});

// Delete a baptism registrant by index
app.delete('/baptism/register/:index', (req, res) => {
  const index = parseInt(req.params.index);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ success: false, message: 'Could not read file' });

    const registrants = JSON.parse(data);

    if (index < 0 || index >= registrants.length) {
      return res.status(400).json({ success: false, message: 'Invalid index' });
    }

    registrants.splice(index, 1); // Remove registrant

    fs.writeFile(filePath, JSON.stringify(registrants, null, 2), err => {
      if (err) return res.status(500).json({ success: false, message: 'Could not write file' });

      res.json({ success: true });
    });
  });
});

module.exports = router;