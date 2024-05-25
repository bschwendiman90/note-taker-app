const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('../helpers/utils.js');

// GET /api/notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});

// POST /api/notes
router.post('/notes', (req, res) => {
    // const notesFilePath = path.join(__dirname, '../data/notes.json');

    // Read the existing notes from the JSON file
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading notes file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        let notes = [];
        if (data) {
            try {
                notes = JSON.parse(data);
            } catch (parseError) {
                console.error('Error parsing notes file:', parseError);
                return res.status(500).json({ message: 'Internal server error' });
            }
        }

        // Create a new note object
        const newNote = {
            id: generateUniqueId(),
            title: req.body.title,
            text: req.body.text
        };

        // Add the new note to the array
        notes.push(newNote);

        // Write the updated notes array back to the JSON file
        fs.writeFile('db/db.json', JSON.stringify(notes, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to notes file:', writeErr);
                return res.status(500).json({ message: 'Internal server error' });
            }

            // Respond with the new note
            res.status(201).json(newNote);
        });
    });
});


module.exports = router;