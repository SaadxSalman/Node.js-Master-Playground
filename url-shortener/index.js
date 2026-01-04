require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const path = require('path'); // Added path module
const Url = require('./models/Url');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // To handle form submissions
app.use(express.static('public')); // To serve our HTML file

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('DB Connection Error:', err));

// Route 1: Create a Short URL
app.post('/shorten', async (req, res) => {
    // Note: express.urlencoded allows you to access data from req.body via forms
    const { fullUrl } = req.body;

    if (!fullUrl) return res.status(400).json({ error: 'URL is required' });

    const shortId = nanoid(7); // Generates a unique 7-character string
    const newUrl = await Url.create({ fullUrl, shortUrl: shortId });

    res.json({ 
        message: 'URL shortened successfully',
        shortUrl: `http://localhost:3000/${shortId}` 
    });
});

// Route 2: Redirect Logic
app.get('/:shortUrl', async (req, res) => {
    const { shortUrl } = req.params;
    const urlData = await Url.findOne({ shortUrl });

    if (urlData) {
        urlData.clicks++;
        await urlData.save();
        return res.redirect(urlData.fullUrl);
    } else {
        return res.status(404).json('URL not found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));