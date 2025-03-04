

const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type : String, required: true}
}, {timestamps: true});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;
