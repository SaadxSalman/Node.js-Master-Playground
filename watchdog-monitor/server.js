require('dotenv').config();
const express = require('express');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let websites = [];

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function sendAlert(url, error) {
    try {
        await transporter.sendMail({
            from: `"Watchdog Monitor" <${process.env.EMAIL_USER}>`,
            to: process.env.NOTIFY_EMAIL,
            subject: `⚠️ ALERT: ${url} is DOWN`,
            html: `<h3>Watchdog Alert</h3><p><b>${url}</b> is unreachable.</p><p>Error: ${error}</p>`
        });
        console.log(`✅ Alert email sent for ${url}`);
    } catch (err) {
        console.error('❌ Email error:', err);
    }
}

const checkWebsites = async () => {
    if (websites.length === 0) return;
    
    // Restoration of the terminal log
    console.log(`--- Running Health Check (${new Date().toLocaleTimeString()}) ---`);
    
    for (let site of websites) {
        try {
            const response = await axios.get(site.url, { timeout: 8000 });
            site.status = response.status === 200 ? 'Up' : 'Down';
        } catch (error) {
            if (site.status !== 'Down') sendAlert(site.url, error.message);
            site.status = 'Down';
        }
        site.lastChecked = new Date().toLocaleTimeString();
    }
};

app.get('/api/status', (req, res) => res.json(websites));

app.post('/api/add', (req, res) => {
    let { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    url = url.trim();
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }

    if (websites.find(s => s.url.toLowerCase() === url.toLowerCase())) {
        return res.status(400).json({ error: 'Already monitoring this URL' });
    }

    const newSite = { url, status: 'Checking...', lastChecked: 'Just added' };
    websites.push(newSite);
    
    // Run an immediate check so the user sees results instantly
    checkWebsites(); 
    
    res.status(201).json(newSite);
});

// Run every 5 minutes
cron.schedule('*/5 * * * *', checkWebsites);

app.listen(PORT, () => {
    console.log(`🐕 Watchdog Live: http://localhost:${PORT}`);
    console.log(`Monitoring ${websites.length} websites. Press Ctrl+C to stop.`);
});