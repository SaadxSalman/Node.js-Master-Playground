
---

# 📧 Automated Email Sender with SQLite & Admin Dashboard

A robust Node.js application that automates user engagement by sending professional HTML "Welcome" emails with PDF attachments upon form submission. It includes a built-in SQLite database for logging inquiries and a secure, password-protected Admin Dashboard.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Features

- **Automated SMTP Integration**: Sends emails instantly via Nodemailer.
- **Rich HTML Templates**: Professional, responsive email designs using dynamic placeholders.
- **File Attachments**: Automatically attaches a "Welcome Guide" PDF to every response.
- **Persistent Storage**: Saves all user inquiries to a local SQLite database.
- **Secure Admin Panel**: A private dashboard protected by Basic Authentication to view and manage inquiries.
- **Modern UI**: Frontend and Admin Panel styled with Tailwind CSS.

---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/saadxsalman/automated-email-sender.git](https://github.com/saadxsalman/automated-email-sender.git)
cd automated-email-sender

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Configuration

Create a `.env` file in the root directory and add your credentials:

```env
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_USER=admin
ADMIN_PASS=password123

```

> **Note:** For Gmail, use an [App Password](https://myaccount.google.com/apppasswords).

### 4. Add Assets

Place a PDF file named `welcome-guide.pdf` inside the `/assets` folder.

### 5. Start the Application

```bash
npm start

```

---

## 📂 Project Structure

```text
├── assets/             # Attachments (PDFs, Images)
├── data/               # SQLite database storage (gitignored)
├── public/             # Frontend (HTML, CSS)
├── templates/          # HTML Email templates
├── app.js              # Server & Logic
├── .env                # Secret keys (gitignored)
└── package.json        # Dependencies

```

---

## 🔐 Security Note

This project uses `.gitignore` to ensure that sensitive information like the `.env` file and the `database.sqlite` file are never pushed to GitHub. Always keep your SMTP credentials private.

---

## 👤 Author

**saadxsalman**

* GitHub: [@saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)

---
