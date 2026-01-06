
---

# distributed-job-queue

A high-performance, distributed background task processing system built with **Node.js**, **BullMQ**, and **Redis**. This project demonstrates the **Producer-Consumer pattern**, allowing heavy tasks to be offloaded from the main API thread to independent background workers.

## 🚀 Features

* **Asynchronous Processing:** Offload heavy tasks (emails, PDF generation, data processing) to keep the API responsive.
* **Worker Pattern:** Decoupled producer and consumer processes.
* **Real-time Monitoring:** Built-in dashboard via **BullBoard** to track job status (Waiting, Active, Completed, Failed).
* **Resiliency:** Automatic retries with configurable backoff strategies.
* **Modern UI:** Simple job trigger interface built with **EJS** and **Tailwind CSS**.
* **Security:** Environment variable management using `dotenv`.

---

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Queue Engine:** BullMQ
* **Data Store:** Redis
* **Styling:** Tailwind CSS
* **Monitoring:** BullBoard

---

## 📋 Prerequisites

* [Node.js](https://nodejs.org/) (v16 or higher)
* [Redis](https://redis.io/download) (Running on port `6379`)

---

## ⚙️ Installation & Setup

1. **Clone the repository:**
```bash
git clone https://github.com/saadxsalman/distributed-job-queue.git
cd distributed-job-queue

```


2. **Install dependencies:**
```bash
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the root directory:
```env
PORT=3000
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

```



---

## 🏃‍♂️ Running the Project

To see the system in action, you need to run the **Producer** and the **Worker** in separate terminal windows.

### 1. Start the Producer (API & Dashboard)

```bash
node src/producer.js

```

* **Frontend:** `http://localhost:3000`
* **Job Dashboard:** `http://localhost:3000/admin/queues`

### 2. Start the Worker (Background Processor)

```bash
node src/worker.js

```

---

## 🧪 Testing the Flow

1. Open the **Frontend** and enter an email address.
2. Click **"Generate Job"**. You will receive an instant Job ID.
3. Check the **Worker terminal** to see the simulated 5-second heavy task processing.
4. Visit the **Dashboard** to see the job move from `Active` to `Completed`.

---

## 📂 Project Structure

```text
distributed-job-queue/
├── src/
│   ├── producer.js    # Express server & BullBoard setup
│   ├── worker.js      # Background job logic
│   └── queueConfig.js # Shared Redis configuration
├── views/
│   └── index.ejs      # Tailwind-powered UI
├── .env               # Secret configuration
├── .gitignore         # Version control exclusions
└── package.json

```
