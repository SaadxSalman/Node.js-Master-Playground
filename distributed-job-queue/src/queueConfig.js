require('dotenv').config();

const queueConfig = {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
};

module.exports = queueConfig;