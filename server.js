const express = require('express');
const path = require('path');
const api = require('./routes/api.js')
// const generateUniqueId = require('helpers/idgen.js');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use('/api', api);

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);




app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});