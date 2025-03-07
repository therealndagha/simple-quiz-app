import { useEffect, useState } from "react";
import axios from 'axios'

const QuestionTile = ({singleQuestion}) =>{
   // console.log(singleQuestion)
    let hasPassedThisQuestion = false;
    const submitResultURL = `http://127.0.0.1:3000/quiz/submit-result/${singleQuestion?._id}`;
    
    const [isClicked, setIsClicked] = useState(false)

    const selectedAnswer = (userSelectedAnswer) =>{
        //console.log(userSelectedAnswer)
        setIsClicked(true);
        const {correctAnswer} = singleQuestion;
        if(userSelectedAnswer === correctAnswer){
            hasPassedThisQuestion = true
        }
        else{
            hasPassedThisQuestion = false
        }
        const data =({
             submittedAnswer: userSelectedAnswer,hasPassedThisQuestion, quizId: singleQuestion.quizId, questionId: singleQuestion._id
        })
        
        //console.log(hasPassedThisQuestion)
         /* axios.post(submitResultURL,data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
         } ).then(response => console.log(response.data)).catch(error => console.log(error.response.data)) */
         
         axios.post(submitResultURL, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
            }
         }).then(response => console.log(response.data)).catch(error => console.log(error.response.data))
    }
          
    

              //console.log(hasPassedThisQuestion)
     
    return (
        <div className="p-3 m-3 shadow border border-slate-200">
            <h3 className="text-xl">{singleQuestion.questionText}</h3>
             <div className="flex flex-col space-y-4">
                {
                    singleQuestion?.options && singleQuestion?.options?.length > 0 ?  singleQuestion?.options?.map(singleOption => <div key={singleOption}>
                        <button  className="hover:bg-slate-50 p-3 m-3" onClick={()=>selectedAnswer(singleOption)} disabled={isClicked} >{singleOption}</button> 
                    </div>
                     ) : null
                }
             </div>
        </div>
    )
}

export default QuestionTile