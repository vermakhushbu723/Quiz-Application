
const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
  const { question, options, rightAnswer, startDate, endDate } = req.body;

  try {
    const quiz = await Quiz.create({ question, options, rightAnswer, startDate, endDate });
    res.json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getActiveQuiz = async (req, res) => {
  try {
    const currentDateTime = new Date();
    const activeQuiz = await Quiz.findOne({
      startDate: { $lte: currentDateTime },
      endDate: { $gte: currentDateTime },
    });

    if (activeQuiz) {
      res.json({ message: 'Active quiz found', activeQuiz });
    } else {
      res.json({ message: 'No active quiz at the moment' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getQuizResult = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const quizResult = calculateQuizResult(quiz);

    res.json({ message: 'Quiz result retrieved successfully', quizResult });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json({ message: 'Quizzes retrieved successfully', quizzes });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const calculateQuizResult = (quiz) => {
  
  return { correctAnswers: 10, totalQuestions: quiz.options.length };
};

module.exports = { createQuiz, getActiveQuiz, getQuizResult, getAllQuizzes };
