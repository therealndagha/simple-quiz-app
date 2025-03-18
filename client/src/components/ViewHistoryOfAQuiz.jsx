import { useContext, useEffect } from "react";
import { QuizContext } from "../context";
import axios from "axios";
import { useParams } from "react-router-dom";


const ViewHistoryOfAQuiz = () =>{
    const {obj, setObj, logOut, questions, setQuestions} = useContext(QuizContext);
    const {quizId} = useParams();

    //console.log(quizId)
    //console.log(obj)
     useEffect(()=>{
        const getItem  = localStorage.getItem('obj');
        if(getItem){
          setObj(JSON.parse(getItem)) 
        }

        const fetchData = async()=>{
             try {
                const response = await axios.get(`http://127.0.0.1:3000/quiz/questions/${quizId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                    }
                })
                if(response.data){
                    setQuestions(response.data.questions)
                }
             } catch (error) {
                console.log(error);

             }
        }
        fetchData()

      
        
     }, [])

    return <div className="bg-slate-300 p-3 m-3">
            <h1 className="text-center text-3xl m-3 text-slate-600">View History of This Quiz</h1>
            <div className=" p-2 flex flex-row justify-around">
                 <h1 className="text-2xl"> <span className="font-bold">Title: </span>{obj.title}</h1>
                 <h1 className="text-2xl"> <span className="font-bold">Grade: </span> {obj.grade}</h1>

            </div>
             <div>
                {
                    questions && questions.length > 0 ? questions.map(singleQuestion =>  <div key={singleQuestion?._id} className="p-3">
                              <h2 className="text-xl mt-3">{singleQuestion.questionText}</h2>
                              <div>
                                  {
                                    singleQuestion.options.map(singleOption => <p className="m-3" key={singleOption}>{singleOption}</p>  ) 
                                  }
                              </div>
                    </div> ): null
                }
             </div>
               <div className="p-3 text-center">
                  <button onClick={logOut} className="bg-indigo-600 text-white mx-2 px-4 py-2 hover:bg-indigo-800 font-bold rounded">LOG OUT😁</button>
               </div>
           </div>
}

export default ViewHistoryOfAQuiz;