


const express = require('express');
const authenticated = require('../middleware/authenticated');
const roleChecker = require('../middleware/roleChecker');
const Question = require('../models/questions');
const Quiz = require('../models/quiz')
const router = express.Router();

// Create a new question
router.post("/questions",authenticated, roleChecker, async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer } = req.body;
    const newQuestion = new Question({ quizId, questionText, options, correctAnswer });
    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
});


//get questions from a quiz
router.get("/questions/:quizId", async (req, res) => {
    try {
      const questions = await Question.find({ quizId: req.params.quizId });
      res.json(questions);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions", error });
    }
  });

  //create quiz
  router.post("/quizzes", authenticated, roleChecker, async (req, res) => {
    try {
      const { title, description } = req.body;
      const newQuiz = new Quiz({ title, description });
      await newQuiz.save();
      res.status(201).json({ message: "Quiz created", newQuiz });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Error creating quiz", error });
    }
  });


 //submit an answer  
  router.post("/submit-answer", async (req, res) => {
    try {
      const { questionId, selectedAnswer } = req.body;
      const question = await Question.findById(questionId);
  
      if (!question) return res.status(404).json({ message: "Question not found" });
  
      const isCorrect = question.correctAnswer === selectedAnswer;
      res.json({ correct: isCorrect });
    } catch (error) {
      res.status(500).json({ message: "Error submitting answer", error });
    }
  });

  





module.exports = router;