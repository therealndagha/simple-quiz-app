

const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
    quizId: {type: mongoose.Schema.Types.ObjectId, ref: 'Quiz'},
    studentId: {type: mongoose.Schema.Types.ObjectId, ref : 'User'},
    finalGrade: {type: Number, required: true}

}, {timestamps: true});


const Grade = mongoose.model('Grade', GradeSchema);


module.exports = Grade;