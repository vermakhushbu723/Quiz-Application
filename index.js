
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressRateLimit = require('express-rate-limit');
const cron = require('cron');
const { setupCronJobs } = require('./cronJobs');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/QuizzesApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middlewares
app.use(express.json());
app.use(expressRateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use('/auth', authRoutes);
app.use('/quizzes', quizRoutes);

// Start cron jobs
setupCronJobs();

// Start the server
app.listen(8000, () => {
  console.log(`Server is running on port 8000`);
});
