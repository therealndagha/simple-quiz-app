
const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
    quizId: {type : mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
    questionText : {type: String, required: true},
    options:[{type: String, required: true}],
    correctAnswer: {type: String, required: true}
}, {timestamps: true});



const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;