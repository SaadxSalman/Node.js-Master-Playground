require('dotenv').config();
const express = require('express');
const axios = require('axios');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Initialize Redis Client
const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await client.connect();
    console.log('Connected to Redis');
})();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());

// 2. Weather Route with Caching Logic
app.get('/', async (req, res) => {
    const city = req.query.city || 'London';
    const cacheKey = `weather:${city.toLowerCase()}`;

    try {
        // Check Redis first
        const cachedData = await client.get(cacheKey);

        if (cachedData) {
            console.log(`Cache Hit for ${city}`);
            return res.render('index', { 
                data: JSON.parse(cachedData), 
                source: 'Redis Cache (Instant)' 
            });
        }

        // Cache Miss - Fetch from OpenWeather
        console.log(`Cache Miss for ${city}. Fetching from API...`);
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                units: 'metric',
                appid: process.env.WEATHER_API_KEY
            }
        });

        const weatherData = response.data;

        // Save to Redis with 1-hour expiration (3600 seconds)
        await client.setEx(cacheKey, 3600, JSON.stringify(weatherData));

        res.render('index', { 
            data: weatherData, 
            source: 'Real-time API' 
        });

    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});