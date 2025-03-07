
import { useContext, useEffect } from "react";
import { QuizContext } from "../context";
import axios from 'axios'
const UserAccessQuizzes = () =>{
    

    const {quizzes, setQuizzes, config, navigate, setCurrentQuiz} = useContext(QuizContext);
    
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
    }, [config]);

    const attemptQuiz = (quiz) =>{
        setCurrentQuiz(quiz)
      navigate(`/attempt-quiz/${quiz._id}`)
    }


    return <>
         <div className="p-3 m-3">
             
                {
                    quizzes && quizzes?.length > 0 ? quizzes.map( singleQuiz =>
                        <div key={singleQuiz?._id} className="flex flex-row justify-around p-5 m-3 shadow border border-slate-100">
                              <div  className="">
                                    <h2 className="text-2xl">{singleQuiz?.title}</h2>
                                    <p className="text-slate-400">{singleQuiz?.description}</p>
                              </div>
                              <div>
                                  <button onClick={()=>attemptQuiz(singleQuiz)}  className="bg-indigo-500 text-white rounded px-2 hover:bg-indigo-800">Attempt Quiz</button>
                              </div>
                        </div>
                        
                     ) : <p>No quizzes found, contact admin to add some quizzes.</p>
                }
             
         </div>
    </>
}


export default UserAccessQuizzes;