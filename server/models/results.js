
const mongoose = require('mongoose');



const ResultSchema = new mongoose.Schema({
    quizId: {type: mongoose.Types.ObjectId, ref: 'Quiz' },
    studentId : {type: mongoose.Types.ObjectId, ref: 'User'},
    questionId : {type: mongoose.Types.ObjectId, ref: 'Question'},
    submittedAnswer: {type: String, required: true},
    hasPassedThisQuestion: {type: Boolean, required: true}
} , {timestamps: true})



const Result = mongoose.model('Result', ResultSchema)


module.exports = Result;