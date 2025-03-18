// QuestionTile Component
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { QuizContext } from "../context";

const QuestionTile = ({ singleQuestion }) => {
    let hasPassedThisQuestion = false;
    const submitResultURL = `http://127.0.0.1:3000/quiz/submit-result/${singleQuestion?._id}`;
    const { totalPoints, setTotalPoints } = useContext(QuizContext);
    const [isClicked, setIsClicked] = useState(false);

    // Reset points when component mounts
    useEffect(() => {
        setTotalPoints(0);
    }, [setTotalPoints]);

    const selectedAnswer = (userSelectedAnswer) => {
        setIsClicked(true);
        const { correctAnswer } = singleQuestion;

        if (userSelectedAnswer === correctAnswer) {
            hasPassedThisQuestion = true;
            setTotalPoints(prevTotalPoints => prevTotalPoints + 1);
        } else {
            hasPassedThisQuestion = false;
        }

        const data = {
            submittedAnswer: userSelectedAnswer,
            hasPassedThisQuestion,
            quizId: singleQuestion.quizId,
            questionId: singleQuestion._id
        };

        axios.post(submitResultURL, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
        }).then(response => console.log(response.data))
          .catch(error => {
            console.log(error.response.data)
            alert(`${error.response.data.message}`)
        });
    };

    return (
        <div className="p-3 m-3 shadow border border-slate-200">
            <h3 className="text-xl">{singleQuestion.questionText}</h3>
            <div className="flex flex-col space-y-4">
                {singleQuestion?.options?.length > 0 && singleQuestion.options.map(singleOption => (
                    <div key={singleOption}>
                        <button
                            className="hover:bg-slate-50 p-3 m-3"
                            onClick={() => selectedAnswer(singleOption)}
                            disabled={isClicked}
                        >
                            {singleOption}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuestionTile;