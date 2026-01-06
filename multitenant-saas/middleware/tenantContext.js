const { AsyncLocalStorage } = require('async_hooks');
const tenantStorage = new AsyncLocalStorage();

const tenantMiddleware = (req, res, next) => {
  // Identify tenant by Header (for API) or Subdomain/Query for this demo
  const tenantId = req.headers['x-tenant-id'] || req.query.tenant;

  if (!tenantId) {
    return res.status(403).send("No Tenant Identified. Use ?tenant=t_1 or t_2");
  }

  // Run the rest of the request within this "Store"
  tenantStorage.run(tenantId, () => {
    next();
  });
};

const getTenantId = () => tenantStorage.getStore();

module.exports = { tenantMiddleware, getTenantId };