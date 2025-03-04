require('dotenv').config();

const express = require('express');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;
const connectToDB = require('./db/connectToDB');
const authRoutes = require('./routes/auth-routes');
const quizRoutes = require('./routes/quiz-routes');


app.use(express.json());
app.use(cors())
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes)

connectToDB()

app.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`));


