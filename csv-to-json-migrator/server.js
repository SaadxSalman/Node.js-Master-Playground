require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fse = require('fs-extra');
const migrateCsvToJson = require('./converter');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Ensure folders exist on startup
fse.ensureDirSync('uploads');
fse.ensureDirSync('converted');

const upload = multer({ dest: 'uploads/' });
app.use(express.static('public'));

app.post('/upload', upload.single('csvfile'), (req, res) => {
  if (!req.file) return res.status(400).send('No file uploaded.');

  const inputPath = req.file.path;
  const outputPath = path.join(__dirname, 'converted', `${req.file.filename}.json`);

  // Start migration
  migrateCsvToJson(inputPath, outputPath, io);
  
  res.status(200).json({ message: 'Processing started...' });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));