const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const generateUniqueId = require('../helpers/utils.js');

// GET /api/notes
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../db/db.json'));
});


module.exports = router;