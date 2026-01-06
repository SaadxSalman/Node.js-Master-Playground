require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./db/database');
const { tenantMiddleware, getTenantId } = require('./middleware/tenantContext');

const app = express();

// --- Configuration ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Routing Logic ---

/**
 * Public Route: Login
 * We define this BEFORE the global middleware or add a bypass check
 * to ensure users can actually reach the login page.
 */
app.get('/login', (req, res) => {
    res.render('login');
});

/**
 * Global Tenant Middleware
 * This intercepts every request below this line.
 * It identifies the tenant and sets the AsyncLocalStorage context.
 */
app.use((req, res, next) => {
    // If we are on the login page, skip the tenant check
    if (req.path === '/login') {
        return next();
    }

    // Attempt to identify tenant from query or header
    const tenantId = req.headers['x-tenant-id'] || req.query.tenant;

    if (!tenantId) {
        // If no tenant is found, redirect to login instead of throwing an error
        return res.redirect('/login');
    }

    // Run the tenantMiddleware logic
    tenantMiddleware(req, res, next);
});

/**
 * Protected Route: Dashboard
 * Secured by the middleware above.
 */
app.get('/', (req, res) => {
    const tenantId = getTenantId();

    try {
        // Fetch Tenant Details
        const tenant = db.prepare('SELECT * FROM tenants WHERE id = ?').get(tenantId);
        
        // Fetch Tenant-Specific Data (Strict Isolation)
        const projects = db.prepare('SELECT * FROM projects WHERE tenant_id = ?').all(tenantId);

        if (!tenant) {
            return res.redirect('/login?error=tenant_not_found');
        }

        res.render('dashboard', { 
            tenant, 
            projects 
        });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("Internal Server Error");
    }
});

/**
 * API Route Example
 * Demonstrates how isolation works in a JSON environment
 */
app.get('/api/projects', (req, res) => {
    const tenantId = getTenantId();
    const projects = db.prepare('SELECT * FROM projects WHERE tenant_id = ?').all(tenantId);
    res.json({ tenantId, projects });
});

// --- Server Activation ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
🚀 Multi-Tenant Server Running
📂 GitHub: saadxsalman
🔗 URL: http://localhost:${PORT}/login
    `);
});