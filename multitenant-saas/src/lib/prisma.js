const { PrismaClient } = require('@prisma/client');

const getTenantClient = (tenantId) => {
  // This changes the 'search_path' in Postgres to the specific tenant schema
  return new PrismaClient({
    datasources: {
      db: {
        url: `${process.env.DATABASE_URL}&schema=${tenantId}`,
      },
    },
  });
};

module.exports = { getTenantClient };