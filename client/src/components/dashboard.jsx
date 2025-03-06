import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";


const QuestionTile = ({question}) =>{
    
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    const [buttonIsClicked , setButtonIsclicked] = useState(false)
    const [message, setMessage] = useState(null)
    const submitAnswer = async(selectedAnswer)=>{
      //console.log(selectedAnswer)
      setButtonIsclicked(true)
       if(question.correctAnswer === selectedAnswer){
        setIsCorrectAnswer(true)
        setMessage('Correct')
       }
       else{
        setIsCorrectAnswer(false)
        setMessage('Incorrect')
       }
    }
     return  <div className="p-3 m-3 shadow">
         <h2 className="text-2xl">{question.questionText}</h2>

          

         <div>
              {
                question?.options && question?.options?.length > 0 ? question.options.map((singleOption, index)=> <div  key={index}>
                      <button onClick={()=>submitAnswer(singleOption)} className="m-3 p-3 hover:bg-slate-300 bg-slate-100 w-1/4">  <span> {singleOption}</span>   </button> 

                      
                </div>): null
              }


<div className="text-center m-3 p-3">
                        {buttonIsClicked ?  <p style={{color : isCorrectAnswer ? 'green' : 'red'}}>{message}</p>  : null }
                      </div>
         </div>
     </div>
}


const Dashboard = () =>{
    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()
    
    const logoutUser = () =>{
        localStorage.removeItem('accessToken');
        navigate('/')
    }

    
     

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if(!token){
            navigate('/')
        }

           try {
             axios.get('http://127.0.0.1:3000/quiz/questions/67c6c9ba3c60666400663f50').then(response => {
                console.log(response.data);
                setQuestions(response.data)
             }).catch(error => console.log(error))
           } catch (error) {
            console.log(error)
           }
        
    }, [])
    return <>
        <div className="p-3">
            <h2 className="text-3xl">Dashboard</h2>

            <div className="text-center">
                <a onClick={()=>navigate('/add-questions')} className="text-blue-500">access add questions route</a>
            </div>
            <div className="p-3 shadow border m-4">
                 <div className="d-flex justify-content-between flex-wrap">
                 {
                    questions && questions.length > 0 ? questions.map( (question) => <QuestionTile key={question._id} question={question} />  ) : <p>Please add some questions.</p>
                 }

                 </div>
                 
            </div>
            <div className="text-center">
                 <button onClick={logoutUser} className="bg-blue-600 hover:bg-blue-900 mx-4 p-3 text-white rounded">Log Out</button>
            </div>
        </div>
    </>
}

export default Dashboard;