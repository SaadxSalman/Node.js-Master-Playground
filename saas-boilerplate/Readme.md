
---

# 🚀 Multi-Tenant SaaS Boilerplate (Node.js + SQLite)

A high-performance, secure Node.js boilerplate demonstrating **Data Isolation** in a multi-tenant environment. This project uses a "Shared Database, Discriminator Column" strategy, ensuring that different companies (tenants) can never access each other's data.

## 🧠 The Architecture: "Tenant-Aware" Logic

This project demonstrates mastery of **AsyncLocalStorage** and **Custom Middleware** to handle context propagation. 

- **Tenant Identification:** The system identifies the tenant via custom headers (`x-tenant-id`) or query parameters.
- **Context Isolation:** Uses Node.js `AsyncLocalStorage` to store the tenant's identity for the lifetime of the request.
- **Data Security:** Every database query is scoped to the active tenant context, preventing "cross-tenant" data leaks.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** SQLite (`better-sqlite3`)
* **Styling:** Tailwind CSS
* **Templating:** EJS
* **Security:** `dotenv` for environment variable management

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/saadxsalman/multi-tenant-saas-boilerplate.git](https://github.com/saadxsalman/multi-tenant-saas-boilerplate.git)
cd multi-tenant-saas-boilerplate

```

### 2. Install dependencies

```bash
npm install

```

### 3. Setup Environment

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development

```

### 4. Run the Application

```bash
node server.js

```

## 🧪 Testing Data Isolation

The project comes pre-seeded with two tenants: **Apple Corp (`t_1`)** and **Banana Inc (`t_2`)**.

* **View Apple Corp Dashboard:** `http://localhost:3000/?tenant=t_1`
* **View Banana Inc Dashboard:** `http://localhost:3000/?tenant=t_2`

Notice how the UI and the data (Projects) change completely based on the `tenant_id` provided, even though they share the same database and code logic.

## 📂 Project Structure

```text
├── db/
│   └── database.js      # Schema design & SQLite connection
├── middleware/
│   └── tenantContext.js # Core Logic: Identity isolation using AsyncLocalStorage
├── views/
│   └── dashboard.ejs    # Tailwind-styled multi-tenant frontend
├── server.js            # Entry point & global middleware orchestration
└── .gitignore           # Ensures saas.db and .env stay private

```

## 🔒 Security Features

* **Secrets Management:** Utilizes `.env` for configuration.
* **Global Middleware:** Tenant identification happens at the entry point, ensuring no "anonymous" requests hit the business logic.
* **Git Safety:** `.gitignore` is configured to prevent leaking sensitive local databases or keys to GitHub.

---

Built with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
