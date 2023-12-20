
const express = require('express');
const { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes } = require('../controllers/quizController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createQuiz);
router.get('/active', getActiveQuiz);
router.get('/:id/result', getQuizResult);
router.get('/all', getAllQuizzes);

module.exports = router;
