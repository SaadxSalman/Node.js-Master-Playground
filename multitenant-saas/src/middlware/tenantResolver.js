const tenantResolver = (req, res, next) => {
  const tenantId = req.headers['x-tenant-id'];

  if (!tenantId) {
    return res.status(400).json({ error: 'Tenant ID header is required' });
  }

  // Attach the tenant ID to the request object for use in routes
  req.tenantId = tenantId.toLowerCase();
  next();
};

module.exports = tenantResolver;