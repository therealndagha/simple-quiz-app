import { useContext, useEffect, useState } from "react"
import { QuizContext } from "../context"
import axios from "axios";
import { useParams } from "react-router-dom";
import QuestionTile from "./QuestionTile";



const AttemptQuiz = () => {

    

    const {currentQuiz, questions, setQuestions, config, totalPoints, finalGrade, setFinalGrade} = useContext(QuizContext);
    const [readyToSubmit, setReadyToSubmit] = useState(false)
     
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
        setReadyToSubmit(true);
         
    }
    
    useEffect(() => {
        if (readyToSubmit) {
            const totalQuestions = questions.length;
            const newGradeFinal = (totalPoints / totalQuestions) * 100;
    
            axios.post(`http://127.0.0.1:3000/quiz/submit-finalGrade/${params.quizId}`, {
                finalGrade: newGradeFinal
            }, config).then(response => {
                 let examStatus = '';
                  const usersGrade = response.data.newlyCreatedGrade.finalGrade;
                  if(usersGrade >= 50){
                    examStatus = 'You Pass'
                  }
                  else{
                    examStatus = 'You Fail'
                  }
                console.log(response.data)
                  
                alert(`your grade is : ${usersGrade}, ${examStatus}`)
            })
              .catch(error => console.log(error.response.data));
    
            setFinalGrade(newGradeFinal);
            setReadyToSubmit(false); 
        }
    }, [readyToSubmit]); 
    



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