
const cron = require('cron');
const Quiz = require('./models/Quiz');

const updateQuizStatusJob = new cron.CronJob('*/1 * * * *', async () => {
  try {
    const currentDateTime = new Date();
    await Quiz.updateMany(
      { endDate: { $lt: currentDateTime } },
      { $set: { status: 'finished' } }
    );
  } catch (error) {
    console.error('Error updating quiz status:', error.message);
  }
});

const setupCronJobs = () => {
  updateQuizStatusJob.start();
};

module.exports = { setupCronJobs };
