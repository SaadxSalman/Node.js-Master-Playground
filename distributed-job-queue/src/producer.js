const express = require('express');
const { Queue } = require('bullmq');
const queueConfig = require('./queueConfig');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

// Initialize the Job Queue
const emailQueue = new Queue('email-tasks', queueConfig);

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send-email', async (req, res) => {
  const { email, subject } = req.body;

  // Add job to queue
  const job = await emailQueue.add('send-welcome-email', {
    to: email,
    subject: subject,
    content: "This is a heavy task being processed in the background!"
  });

  res.json({ success: true, jobId: job.id });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Producer running on http://localhost:${PORT}`));