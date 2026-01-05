require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const migrateCsvToJson = require('./converter');

const app = express();
const upload = multer({ dest: 'uploads/' });
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.post('/upload', upload.single('csvfile'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, 'converted', `${req.file.filename}.json`);

  migrateCsvToJson(inputPath, outputPath);
  
  res.send(`File received! Processing started. Check the "/converted" folder.`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});