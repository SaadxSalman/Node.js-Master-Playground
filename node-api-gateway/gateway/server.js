require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Global Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Serve the Frontend Dashboard
app.use(express.static(path.join(__dirname, '../public')));

// 2. Authentication Middleware (Example)
const authMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (apiKey === 'saadxsalman-secret-key') {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized: Invalid API Key" });
    }
};

// 3. Proxy Routes
// Route to Auth Service
app.use('/api/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/auth': '' },
}));

// Route to Product Service (Protected by Auth)
app.use('/api/products', authMiddleware, createProxyMiddleware({
    target: process.env.PRODUCT_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: { '^/api/products': '' },
}));

app.listen(PORT, () => {
    console.log(`🚀 Gateway running at http://localhost:${PORT}`);
});