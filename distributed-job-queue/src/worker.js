const { Worker } = require('bullmq');
const queueConfig = require('./queueConfig');

console.log("👷 Worker started. Waiting for jobs...");

const worker = new Worker('email-tasks', async (job) => {
  console.log(`[Job ${job.id}] Processing for: ${job.data.to}`);
  
  // Simulate heavy task (e.g., 5 seconds delay)
  await new Promise(resolve => setTimeout(resolve, 5000));

  console.log(`[Job ${job.id}] ✅ Email sent successfully!`);
}, queueConfig);

worker.on('failed', (job, err) => {
  console.error(`[Job ${job.id}] ❌ Failed: ${err.message}`);
});