const express = require("express")
const fs = require('fs')
const path = require('path')
const router = express.Router();

const filePath = path.join(__dirname, '../data/easter.json');

// Fetch the easter data
router.get('/easter', (req, res) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const configs = JSON.parse(data);
        return res.json(configs);
    } catch (error) {
        console.error('Failed to read easter data:', error);
        return res.status(500).json({error:"Failed to load easter Data"})
    }
});

module.exports = router;