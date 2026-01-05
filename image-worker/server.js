require('dotenv').config();
const express = require('express');
const multer = require('multer');
const path = require('path');
const { processImage } = require('./utils/processor');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use('/processed', express.static('processed'));

// Home Page
app.get('/', (req, res) => {
    res.render('index', { images: null });
});

// Upload and Process Route
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');
        
        await processImage(req.file);
        
        const fileName = path.parse(req.file.filename).name;
        const results = {
            original: req.file.originalname,
            thumbnail: `/processed/${fileName}-thumb.webp`,
            grey: `/processed/${fileName}-grey.webp`,
            mobile: `/processed/${fileName}-mobile.webp`
        };

        res.render('index', { images: results });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing image.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));