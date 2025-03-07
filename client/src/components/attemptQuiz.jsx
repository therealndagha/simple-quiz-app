import { useContext, useEffect, useState } from "react"
import { QuizContext } from "../context"
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionTile from "./QuestionTile";



const AttemptQuiz = () => {

    

    const {currentQuiz, questions, setQuestions, config} = useContext(QuizContext);
     const params = useParams();
        
     //console.log(params)
     useEffect(()=>{
        if(config){
            if(currentQuiz?._id){
                axios.get(`http://127.0.0.1:3000/quiz/questions/${params.quizId}`,config).then(response =>{
                   // console.log(response.data);
                    setQuestions(response.data.questions)
                }).catch(error => {
                   // console.log(error.response.data)
                })
            }
        }
     }, [config, params])

     const submitForGrading = () => {
        const totalNumberOfQuestions = questions?.length;
        console.log(totalNumberOfQuestions)

    }

    return <div className="p-3 m-3">
         <h1 className="text-2xl">Attempt Quiz : {currentQuiz?.title }</h1>
         {
            questions && questions.length > 0 ? questions.map(singleQuestion => <QuestionTile key={singleQuestion?._id} singleQuestion={singleQuestion} /> ) : null
         }
         <div className="text-center p-3">
              <button onClick={submitForGrading} className="rounded bg-blue-500 hover:bg-blue-800 text-white px-4 py-2">Submit For Grading</button>
         </div>
    </div>
}


export default AttemptQuiz;