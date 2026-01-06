
---

# 🚀 Node.js API Gateway & Reverse Proxy

A robust, centralized entry point for microservices architecture. This project demonstrates how to manage multiple internal services through a single gateway, implementing security, rate limiting, and request routing.

## 🏗️ Architecture
The Gateway acts as a "Traffic Cop" for the system:
1.  **Client** sends a request to Port `3000`.
2.  **Gateway** checks for Rate Limits and API Key Authentication.
3.  **Proxy Middleware** strips the prefix and forwards the request to the correct microservice.
4.  **Microservice** processes the request and returns data through the Gateway.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Proxying:** `http-proxy-middleware`
- **Security:** `express-rate-limit` & `dotenv`
- **Frontend:** HTML5 / Tailwind CSS

## 📂 Project Structure
```text
node-api-gateway/
├── gateway/
│   ├── server.js          # The "Brain" (Routing & Logic)
│   ├── .env               # Secret service URLs
│   └── .gitignore         # Keeps node_modules/ and .env out of Git
├── services/
│   ├── auth-service.js    # Mock Auth Microservice (Port 4000)
│   └── product-service.js # Mock Product Microservice (Port 5000)
└── public/
    └── index.html         # Tailwind CSS Monitoring Dashboard

```

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone [https://github.com/saadxsalman/Node.js-Master-Playground.git](https://github.com/saadxsalman/Node.js-Master-Playground.git)
cd node-api-gateway/gateway
npm install

```

### 2. Configure Environment

Create a `.env` file in the `gateway/` directory:

```env
PORT=3000
AUTH_SERVICE_URL=http://localhost:4000
PRODUCT_SERVICE_URL=http://localhost:5000

```

### 3. Run the System

You need to run the services and the gateway simultaneously. Open three terminals:

**Terminal 1 (Auth Service):**

```bash
node services/auth-service.js

```

**Terminal 2 (Product Service):**

```bash
node services/product-service.js

```

**Terminal 3 (Gateway):**

```bash
node gateway/server.js

```

## 🧪 Testing the API

Open `http://localhost:3000` in your browser to use the built-in Dashboard.

| Feature | Route | Security |
| --- | --- | --- |
| **Auth Service** | `/api/auth` | Public |
| **Product Service** | `/api/products` | Requires `x-api-key` header |

## 🧠 What I Learned

* **Reverse Proxying:** Using `http-proxy-middleware` to mask internal server structures.
* **Path Rewriting:** Stripping `/api/auth` so the internal service receives a clean `/` route.
* **Global Rate Limiting:** Protecting the entire infrastructure from brute-force/DDoS attacks.
* **Middleware Injection:** Running authentication logic at the Gateway level before requests reach sensitive services.

---

Built with ❤️ by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
