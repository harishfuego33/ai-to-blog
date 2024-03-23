// server.js

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const dotenv=require('dotenv')
dotenv.config()
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle POST requests to save content
app.post('/save-content', (req, res) => {
    const { title, content } = req.body;
    console.log(title);
    console.log("Hello")
    const fileName = title ? `${title}.txt` : 'notes.txt';
    const filePath = path.join(__dirname, 'make-notes', fileName);

    // Check if the directory exists, if not, create it
    const dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    // Check if the file exists
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        // File doesn't exist, create it and write content
        fs.writeFile(filePath, content + '\n\n', (err) => {
            if (err) {
                console.error('Error saving content:', err);
                res.status(500).send('Error saving content');
            } else {
                console.log('Content saved successfully');
                res.status(200).send('Content saved successfully');
            }
        });
    } else {
        // File exists, append content
        fs.appendFile(filePath, content + '\n\n', (err) => {
            if (err) {
                console.error('Error saving content:', err);
                res.status(500).send('Error saving content');
            } else {
                console.log('Content saved successfully');
                res.status(200).send('Content saved successfully');
            }   
        });
    }
});


});

// Start the server
const port = process.env.PORT||8000;
console.log(port)
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

