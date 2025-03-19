import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../context";
import axios from "axios";
import { useParams } from "react-router-dom";

const ViewHistoryOfAQuiz = () => {
  const { obj, setObj, logOut, questions, setQuestions } = useContext(QuizContext);
  const { quizId } = useParams();

  // State to store question results for this student
  const [questionResults, setQuestionResults] = useState({});

  useEffect(() => {
    const getItem = localStorage.getItem("obj");
    if (getItem) {
      setObj(JSON.parse(getItem));
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/quiz/questions/${quizId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
          },
        });

        if (response.data) {
          setQuestions(response.data.questions);
          // Fetch student-specific results after getting questions
          fetchResultsForStudent(response.data.questions);
        }
      } catch (error) {
        console.error("❌ Error fetching questions:", error);
      }
    };

    fetchData();
  }, [quizId, setObj, setQuestions]);

  // Fetch personalized results for each question
  const fetchResultsForStudent = async (questions) => {
    try {
      const results = {};
      for (const question of questions) {
        const response = await axios.get(
          `http://127.0.0.1:3000/quiz/single-result/${question._id}/${quizId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`,
            },
          }
        );

        if (response.data.success) {
          results[question._id] = response.data.findResult;
        }
      }
      setQuestionResults(results); // Store all results by questionId
    } catch (error) {
      console.error("❌ Error fetching student results:", error);
    }
  };

  return (
    <div className="bg-slate-300 p-3 m-3">
      <h1 className="text-center text-3xl m-3 text-slate-600">View History of This Quiz</h1>

      <div className="p-2 flex flex-row justify-around">
        <h1 className="text-2xl">
          <span className="font-bold">Title: </span>
          {obj.title}
        </h1>
        <h1 className="text-2xl">
          <span className="font-bold">Grade: </span>
          {obj.grade}
        </h1>
      </div>

      <div>
        {questions && questions.length > 0 ? (
          questions.map((singleQuestion) => (
            <div key={singleQuestion._id} className="p-3">
              <h2 className="text-xl mt-3">{singleQuestion.questionText}</h2>
              <div>
                {singleQuestion.options.map((singleOption) => (
                  <p className="m-3" key={singleOption}>
                    {singleOption}
                  </p>
                ))}
              </div>

              {/* Display result if available */}
              {questionResults[singleQuestion._id] ? (
                <div className="mt-2">
                  <p className="text-green-700">
                    ✅ Your Answer: {questionResults[singleQuestion._id].submittedAnswer}
                  </p>
                  <p
                    className={
                      questionResults[singleQuestion._id].hasPassedThisQuestion
                        ? "text-blue-700"
                        : "text-red-700"
                    }
                  >
                    📊 Status:{" "}
                    {questionResults[singleQuestion._id].hasPassedThisQuestion
                      ? "Passed"
                      : "Failed"}
                  </p>
                  {/* Display correct answer if the user failed */}
                  {!questionResults[singleQuestion._id].hasPassedThisQuestion && (
                    <p className="text-red-600">
                      ❌ Correct Answer: {singleQuestion.correctAnswer}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">🕵️ Result not available for this question</p>
              )}
            </div>
          ))
        ) : (
          <p>Loading questions...</p>
        )}
      </div>

      <div className="p-3 text-center">
        <button
          onClick={logOut}
          className="bg-indigo-600 text-white mx-2 px-4 py-2 hover:bg-indigo-800 font-bold rounded"
        >
          LOG OUT 😁
        </button>
      </div>
    </div>
  );
};

export default ViewHistoryOfAQuiz;
