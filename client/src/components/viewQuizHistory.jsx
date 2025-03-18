
import { useState, useEffect, useContext } from "react";
import {QuizContext} from '../context'
import axios from "axios";


const SingleGradeTile = ({singleGrade}) =>{
    //console.log(singleGrade)
    const [singleQuiz, setSingleQuiz] = useState({})
    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await  axios(`http://127.0.0.1:3000/quiz/${singleGrade.quizId}`);
                if(response.data){
                    //console.log(response.data)
                    setSingleQuiz(response.data.quiz)
                }
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
        fetchData()
    }, [])
    return <div className="p-3 m-3 shadow-md border border-slate-200">
           <div className="flex flex-row justify-around p-5">
             <h2>{singleQuiz.title}</h2> <h2>{singleGrade.finalGrade}</h2>
           </div>
    </div>
}

const ViewHistory = () => {
    
    const [loading, setLoading] = useState(true);
    const [grades, setGrades] = useState(null);
    const [errMsg, setErrMsg] = useState(null)
    const configurations = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
        }
    }
   
    
    useEffect(()=>{
         const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get('http://127.0.0.1:3000/quiz/history', configurations);
                if(response.data){
                    setGrades(response.data.getGrades)
                   // console.log(response.data);
                    
                    setErrMsg(null)
                }
            } catch (error) {
                console.log(error.response.data)
                setLoading(false)
                setGrades(null)
                setErrMsg(error.response.data.message)
            }
             finally{
                setLoading(false)

             }
         }

          fetchData()

    }, [])

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4 text-blue-800">Your Quiz History</h2>
            {
                loading ? <p>loading data please wait...👌</p> : null
            }
            {
                errMsg ? <p>{errMsg}</p> : null
            }
            {
                grades && grades?.length > 0 ? grades.map(singleGrade => <SingleGradeTile key={singleGrade?._id} singleGrade={singleGrade} /> ) : null 
            }
        </div>
    );
};

 

export default ViewHistory;