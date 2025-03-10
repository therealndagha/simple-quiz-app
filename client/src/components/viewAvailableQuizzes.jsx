import { useContext, useEffect } from "react";
import { QuizContext } from "../context";
import axios from "axios";
import SingleQuizTile from "./SingleQuizTile";



const ViewAvailableQuizzes = () =>{

    const {quizzes, setQuizzes,hasCreatedQuiz, config} = useContext(QuizContext);
    
    const getQuizURL = 'http://127.0.0.1:3000/quiz/get-quizzes';

    useEffect(() => {
        if (config.headers?.Authorization) {
            axios.get(getQuizURL, config)
                .then(response => {
                    setQuizzes(response?.data.quizList);
                    //console.log(response.data);
                })
                .catch(error => console.log(error.response?.data));
        }
    }, [config, quizzes, hasCreatedQuiz]);

    return <div className="p-3 m-3">
         <h2 className="text-3xl">Available Quizzes</h2>
         {
            quizzes && quizzes.length > 0 ? quizzes.map(singleQuiz => <SingleQuizTile key={singleQuiz?._id} singleQuiz={singleQuiz} /> ) : <p>No Quizzes Found , Please create a quiz.</p>
         }
    </div>
}

export default ViewAvailableQuizzes;