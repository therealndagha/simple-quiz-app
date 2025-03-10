


const express = require('express');
const authenticated = require('../middleware/authenticated');
const roleChecker = require('../middleware/roleChecker');
const Question = require('../models/questions');
const Quiz = require('../models/quiz');
const Result = require('../models/results');
const Grade = require('../models/grade');
const router = express.Router();


router.get('/protected', authenticated, roleChecker, async (req, res) => {

  

  res.status(200).json({
      success: true,
      message: 'Admin route reached.'
  });
});



// Create a new question
router.post("/questions",authenticated, roleChecker, async (req, res) => {
  try {
    const { quizId, questionText, options, correctAnswer } = req.body;
   
    const findQuestionIfExists = await Question.findOne({questionText});

    if(findQuestionIfExists){
      return res.status(400).json({
        success:false,
        message: 'question was already added, please add another question.'
      })
    }
     
        
    const newQuestion = new Question({ quizId, questionText, options, correctAnswer });
    await newQuestion.save();
    res.status(201).json({ message: "Question created successfully", newQuestion });
  } catch (error) {
    res.status(500).json({ message: "Error creating question", error });
  }
});


//get questions from a quiz
router.get("/questions/:quizId", authenticated, async (req, res) => {
    try {
      const decodedTokenInfo = req.user
      const questions = await Question.find({ quizId: req.params.quizId });
      if(questions?.length === 0)
      {
        return res.json(
          {
            success:false,
            message:'no questions found'
          }
        )
      }
     return  res.json({
        success:true, 
        message: 'here are the questions',
        questions,
        decodedTokenInfo
      });
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions", error });
    }
  });

  //create quiz
  router.post("/quizzes", authenticated, roleChecker, async (req, res) => {
    try {
      const { title, description } = req.body;
      const findQuiz = await Quiz.findOne({title, description});
      if(findQuiz){
        return res.status(400).json({
          success: false,
          message: 'quiz was already added please add another one.'
        })
      }
      const newQuiz = new Quiz({ title, description });
      await newQuiz.save();
      res.status(201).json({ message: "Quiz created", newQuiz });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: "Error creating quiz", error });
    }
  });

//get quizzes

  router.get("/get-quizzes", authenticated,  async(req,res)=>{
    try {
      const quizList = await Quiz.find({});
      if(quizList?.length === 0){
        return res.status(404).json({
          success:false,
          message: 'no quiz has been added yet please add some quizzes'
        })
      }
      return res.status(200).json({
        success:true,
        quizList
      })
    } catch (error) {
       console.log(error);
       return res.status(500).json({success:false, message:'Error getting quizzes', error});
    }
  })

 //submit an answer  
  router.post("/submit-answer", async (req, res) => {
    try {
      const { questionId, selectedAnswer } = req.body;
      const decodedTokenInfo = req.user;
      const question = await Question.findById(questionId);
  
      if (!question) return res.status(404).json({ message: "Question not found" });
  
      const isCorrect = question.correctAnswer === selectedAnswer;
      res.json({ correct: isCorrect });
    } catch (error) {
      res.status(500).json({ message: "Error submitting answer", error });
    }
  });



  //submit results

  
   router.post('/submit-result/:questionId', authenticated, async(req,res)=>{
      try {
         const {submittedAnswer, quizId, hasPassedThisQuestion} = req.body;
         const decodedTokenInfo = req.user;
         const studentId = decodedTokenInfo.id;
         const {questionId} = req.params;
         
         //console.log(questionId)
         //console.log('studentId', studentId);
         if(!submittedAnswer|| !studentId || !quizId){
          return res.status(400).json({
            success:false,
            message: 'all fields are mandatory.'
          })
         }
         const findResultOfStudentWhoAlreadySubmittedThisResult = await Result.findOne({studentId, questionId,quizId});
         if(findResultOfStudentWhoAlreadySubmittedThisResult){
           return res.status(400).json({
            success:false,
            message: 'You already attempted this quiz, please try another quiz'
           })
         }
         const newlyCreatedResult = await Result.create({
          quizId, questionId, studentId, submittedAnswer, hasPassedThisQuestion 
         });
         
        
        
         if(newlyCreatedResult){
          return res.status(201).json({
            success:true,
            message:'Result created successfully',
            newlyCreatedResult
          })
         }

      } catch (error) {
        console.log('error when submitting answer', error);
        return res.status(500).json({success:false, message: 'Error submitting answer', error})
      }
   })


   
//submit grade 

router.post('/submit-finalgrade/:quizId', authenticated, async(req,res)=>{
    try {
      const decodedTokenInfo = req.user;
      const studentId = decodedTokenInfo.id;
      const {quizId} = req.params;
      const {finalGrade} = req.body;
      //let's check if the student already attempted this quiz
        const findGradeOfStudentWhoAttemptedThisQuiz = await Grade.findOne({quizId}, {studentId});
        if(findGradeOfStudentWhoAttemptedThisQuiz){
          return res.status(400).json({
            success:false,
            message: 'You already attempted this quiz , try another quiz'
          })
        }
      const newlyCreatedGrade = await Grade.create({studentId, quizId, finalGrade});
      if(newlyCreatedGrade){
        return res.status(201).json({
          success:true,
          message: 'grade saved successfully',
          newlyCreatedGrade
        })
      }
    } catch (error) {
       console.log('error while submitting grade' , error);
       return res.status(500).json({
        success:false,
        message:'something went wrong while submitting the finalGrade',
        error
       })
    }
})

router.get('history', authenticated, async(req,res)=>{
  const decodedTokenInfo = req.user;
  const studentId = decodedTokenInfo.id;
  const quizListAttemptedByThis = await Result.find({studentId}, {quizId: 1});
  
})

module.exports = router;