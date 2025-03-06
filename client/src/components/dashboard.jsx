import axios from "axios";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";


const QuestionTile = ({question , passCount, setPassCount}) =>{
    
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    const [buttonIsClicked , setButtonIsclicked] = useState(false)
    const [message, setMessage] = useState(null)
   

    const submitAnswer = (selectedAnswer)=>{
      //console.log(selectedAnswer)
      setButtonIsclicked(true)
       if(question.correctAnswer === selectedAnswer){
        setIsCorrectAnswer(true)
        setMessage('Correct')
        setPassCount(prevCount => (prevCount+1))
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
                      <button onClick={()=>submitAnswer(singleOption)} className="m-3 p-3 hover:bg-slate-300 bg-slate-100 w-1/4" disabled ={buttonIsClicked ? true : false}>  <span> {singleOption}</span>   </button> 

                      
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

    
    const [passCount, setPassCount] = useState(0);
    
    const [gradeMessage, setGradeMessage] = useState("")

    const logoutUser = () =>{
        localStorage.removeItem('accessToken');
        navigate('/')
    }

    //console.log(passCount)
     

    useEffect(()=>{
        const token = JSON.parse(localStorage.getItem("accessToken"));

        if(!token){
            navigate('/')
        }

           try {
             axios.get('http://127.0.0.1:3000/quiz/questions/67c6c9ba3c60666400663f50').then(response => {
                //console.log(response.data);
                setQuestions(response.data)
             }).catch(error => console.log(error))
           } catch (error) {
            console.log(error)
           }
        
    }, [])

   const grader = () =>{
    //console.log('grader triggered')
    const totalQuestions = questions.length;
    const finalGrade = (passCount/totalQuestions)*100;
    if(finalGrade >= 60){
        console.log('You pass')
        setGradeMessage(`You pass!!, score: ${finalGrade}`)
    }
    else{
        console.log('You fail')
        setGradeMessage(`You fail!!, score: ${finalGrade}`)
    }

    
   }

    return <>
        <div className="p-3">
            <h2 className="text-3xl">Dashboard</h2>

            <div className="text-center">
                <a onClick={()=>navigate('/add-questions')} className="text-blue-500">access add questions route</a>
            </div>
            <div className="p-3 shadow border m-4">
                 <div className="d-flex justify-content-between flex-wrap">
                 {
                    questions && questions.length > 0 ? questions.map( (question) => <QuestionTile key={question._id} question={question} setPassCount ={setPassCount} passCount ={passCount} />  ) : <p>Please add some questions.</p>
                 }

                 </div>
                 
                 <div className="text-center">
                    <button onClick={grader} className="bg-indigo-500 hover:bg-indigo-800 rounded text-white px-5">Submit for grading</button>
                    
                    <div>
                        <p className="text-green-300">{gradeMessage}</p>
                    </div>

                 </div>

            </div>
            <div className="text-center">
                 <button onClick={logoutUser} className="bg-blue-600 hover:bg-blue-900 mx-4 p-3 text-white rounded">Log Out</button>
            </div>
        </div>
    </>
}

export default Dashboard;