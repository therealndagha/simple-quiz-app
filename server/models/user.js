
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullname : {type : String , required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: { type: String, enum : ['student', 'admin'], default: 'student' }
}, {timestamps: true});


const User = mongoose.model('User', UserSchema);

module.exports = User;

