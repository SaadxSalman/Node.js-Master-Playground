
---

# 📚 Book Directory REST API

A robust, production-ready backend system for managing a book collection. This project demonstrates the transition from local JSON storage to a scalable **MongoDB** architecture, featuring strict data validation and secure environment configurations.

## 🚀 Features

* **Full CRUD Operations:** Create, Read, Update, and Delete books.
* **Database Persistence:** Powered by MongoDB & Mongoose.
* **Data Validation:** Strict schema rules (e.g., preventing future publication dates).
* **Security:** Environment variables handled via `dotenv` to protect sensitive credentials.
* **Scalability:** Ready for deployment with a flexible port and connection string setup.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Environment Management:** Dotenv

---

## 📋 Prerequisites

* [Node.js](https://nodejs.org/) (v14+ recommended)
* [MongoDB](https://www.mongodb.com/try/download/community) installed locally OR a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account.

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/saadxsalman/books-directory.git
cd books-directory

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory and add your configuration:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore

```


4. **Run the application:**
```bash
# For standard run
node index.js

# For development (if nodemon is installed)
npm start

```



---

## 🛣️ API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| **GET** | `/books` | Retrieve all books (sorted by newest) |
| **GET** | `/books/:id` | Retrieve a single book by its ID |
| **POST** | `/books` | Add a new book (Requires: title, author) |
| **PUT** | `/books/:id` | Update an existing book's details |
| **DELETE** | `/books/:id` | Remove a book from the directory |

---

## 🧪 Example Request Body

```json
{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "publishedYear": 1988,
  "genre": "Adventure"
}

```

---

## 👤 Author

**Saad Salman**

* GitHub: [@saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

---
