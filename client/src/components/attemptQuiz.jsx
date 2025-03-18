
import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context";
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionTile from "./QuestionTile";

const AttemptQuiz = () => {
    const { currentQuiz, questions, setQuestions, config, totalPoints, finalGrade, setFinalGrade } = useContext(QuizContext);
    const [readyToSubmit, setReadyToSubmit] = useState(false);

    const params = useParams();

    useEffect(() => {
        // Retrieve questions from localStorage if available
        const storedQuestions = localStorage.getItem(`questions_${params.quizId}`);

        if (storedQuestions) {
            setQuestions(JSON.parse(storedQuestions)); // Load from storage
        } else if (config && currentQuiz?._id) {
            // Fetch from API if not in storage
            axios.get(`http://127.0.0.1:3000/quiz/questions/${params.quizId}`, config)
                .then(response => {
                    setQuestions(response.data.questions);
                    localStorage.setItem(`questions_${params.quizId}`, JSON.stringify(response.data.questions)); // Store in localStorage
                })
                .catch(error => {
                    console.error("Error fetching questions: ", error.response?.data);
                });
        }
    }, [config, params.quizId, currentQuiz?._id, setQuestions]);

    const submitForGrading = () => {
        setReadyToSubmit(true);
    };

    useEffect(() => {
        if (readyToSubmit) {
            const totalQuestions = questions.length;
            const newGradeFinal = (totalPoints / totalQuestions) * 100;

            axios.post(`http://127.0.0.1:3000/quiz/submit-finalGrade/${params.quizId}`, {
                finalGrade: newGradeFinal
            }, config)
                .then(response => {
                    let examStatus = response.data.newlyCreatedGrade.finalGrade >= 50 ? 'You Pass' : 'You Fail';
                    alert(`Your grade is: ${response.data.newlyCreatedGrade.finalGrade}, ${examStatus}`);
                    localStorage.removeItem(`questions_${params.quizId}`); // Clear questions after submission
                })
                .catch(error => console.error("Error submitting grade: ", error.response?.data));

            setFinalGrade(newGradeFinal);
            setReadyToSubmit(false);
        }
    }, [readyToSubmit, questions, params.quizId, totalPoints, config, setFinalGrade]);

    return (
        <div className="p-3 m-3">
            <h1 className="text-2xl">Attempt Quiz: {currentQuiz?.title}</h1>
            {questions && questions.length > 0
                ? questions.map(singleQuestion => (
                    <QuestionTile key={singleQuestion?._id} singleQuestion={singleQuestion} />
                ))
                : <p>Loading questions...</p>
            }
            <div className="text-center p-3">
                <button onClick={submitForGrading} className="rounded bg-blue-500 hover:bg-blue-800 text-white px-4 py-2">
                    Submit For Grading
                </button>
            </div>
        </div>
    );
};

export default AttemptQuiz;
