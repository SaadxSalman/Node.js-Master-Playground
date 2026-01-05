
---

# 🎨 CollabBoard: Real-Time Collaborative Whiteboard

A lightweight, high-performance real-time collaborative whiteboard built with **Node.js**, **Socket.io**, and **HTML5 Canvas**. This project allows multiple users to draw on a shared canvas simultaneously with synchronized strokes and unique user colors.



## ✨ Features
* **Real-Time Sync**: Instant stroke synchronization across all connected clients.
* **Unique Identity**: Each user is assigned a random color to distinguish their strokes.
* **Responsive Design**: Built with **Tailwind CSS** for a modern, dark-themed UI.
* **Global Clear**: A simple sync-action to clear the canvas for everyone.
* **Binary-lite Data**: Efficiently handles coordinate data via WebSockets.

## 🛠️ Tech Stack
* **Frontend**: HTML5 Canvas, Tailwind CSS, Socket.io Client
* **Backend**: Node.js, Express.js
* **Real-Time**: Socket.io
* **Environment**: Dotenv for configuration

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v14 or higher)
* npm

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/saadxsalman/collaborative-whiteboard.git](https://github.com/saadxsalman/collaborative-whiteboard.git)
   cd collaborative-whiteboard

```

2. **Install dependencies**
```bash
npm install

```


3. **Configure Environment**
Create a `.env` file in the root directory:
```env
PORT=3000

```


4. **Run the Application**
```bash
node index.js

```


5. **Open the App**
Navigate to `http://localhost:3000` in your browser. Open a second tab to test the real-time collaboration!

## 📁 Project Structure

```text
.
├── public/
│   └── index.html    # Frontend logic and Tailwind UI
├── .env              # Environment variables (ignored by git)
├── .gitignore        # Git ignore rules
├── index.js          # Express server & Socket.io logic
├── package.json      # Dependencies and scripts
└── README.md         # Documentation

```

## 📝 License

This project is open-source and available under the MIT License.

---

Built by [saadxsalman](https://www.google.com/search?q=https://github.com/saadxsalman)
