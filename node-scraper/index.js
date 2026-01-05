require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
    try {
        const url = process.env.TARGET_URL;
        
        // 1. Fetch the HTML
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        // 2. Load HTML into Cheerio
        const $ = cheerio.load(data);
        const articles = [];

        // 3. Select relevant elements (Targeting BBC news structure)
        // Note: CSS classes change often; currently targeting <h2> and <a> within story containers
        $('div[data-testid="gh-inner-container"] h2, .gs-c-promo-heading').each((i, element) => {
            if (i < 10) { // Limit to 10 results
                const title = $(element).text().trim();
                const link = $(element).find('a').attr('href') || $(element).closest('a').attr('href');
                const fullLink = link?.startsWith('http') ? link : `https://www.bbc.com${link}`;

                if (title && fullLink) {
                    articles.push({ title, link: fullLink });
                }
            }
        });

        res.render('index', { articles });
    } catch (error) {
        console.error("Scraping Error:", error.message);
        res.render('index', { articles: [], error: "Failed to fetch data." });
    }
});

app.listen(PORT, () => {
    console.log(`Scraper running at http://localhost:${PORT}`);
});