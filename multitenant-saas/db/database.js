const Database = require('better-sqlite3');
const db = new Database('saas.db');

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS tenants (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tenant_id TEXT NOT NULL,
    title TEXT NOT NULL,
    FOREIGN KEY (tenant_id) REFERENCES tenants(id)
  );
`);

// Seed data if empty
const tenantCheck = db.prepare('SELECT count(*) as count FROM tenants').get();
if (tenantCheck.count === 0) {
  db.prepare('INSERT INTO tenants (id, name, slug) VALUES (?, ?, ?)').run('t_1', 'Apple Corp', 'apple');
  db.prepare('INSERT INTO tenants (id, name, slug) VALUES (?, ?, ?)').run('t_2', 'Banana Inc', 'banana');
  
  db.prepare('INSERT INTO projects (tenant_id, title) VALUES (?, ?)').run('t_1', 'iPhone 16 Launch');
  db.prepare('INSERT INTO projects (tenant_id, title) VALUES (?, ?)').run('t_2', 'New Ripening Process');
}

module.exports = db;