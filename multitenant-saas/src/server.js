require('dotenv').config();
const express = require('express');
const tenantResolver = require('./middleware/tenantResolver');
const { getTenantClient } = require('./lib/prisma');

const app = express();
app.use(express.json());

// Application Routes
app.get('/users', tenantResolver, async (req, res) => {
  const prisma = getTenantClient(req.tenantId);
  try {
    const users = await prisma.user.findMany();
    res.json({ tenant: req.tenantId, users });
  } catch (e) {
    res.status(500).json({ error: "Schema may not exist" });
  } finally {
    await prisma.$disconnect();
  }
});

// Route to onboard a new company (Create their schema)
app.post('/onboard', async (req, res) => {
  const { companyName } = req.body;
  const prisma = new PrismaClient();
  
  try {
    // 1. Create the schema in Postgres
    await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${companyName}"`);
    
    // 2. Run migrations for this new schema (usually via a CLI wrapper or raw SQL)
    // For simplicity in this boilerplate, we assume the schema is ready or use:
    // await prisma.$executeRawUnsafe(`CREATE TABLE "${companyName}"."User" ...`);

    res.json({ message: `Tenant ${companyName} onboarded successfully.` });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`SaaS Server running on port ${PORT}`));