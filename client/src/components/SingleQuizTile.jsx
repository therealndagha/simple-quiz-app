import { useContext } from "react";
import { QuizContext } from "../context";


const SingleQuizTile = ({singleQuiz}) =>{
   
   const {navigate, setCurrentQuiz} = useContext(QuizContext);
 
    const renderAddQuestionsToQuizComponent = (selectedQuiz) =>{
       setCurrentQuiz(selectedQuiz)
       navigate(`/add-questions/${selectedQuiz._id}`);
       
    }

    return (
        <div className="p-3 m-3 shadow border border-slate-100">
              <div className="flex  flex-row justify-around">
                 <div>
                    <p>{singleQuiz.title}</p>
                 </div>
                 <div>
                    <button onClick={()=>renderAddQuestionsToQuizComponent(singleQuiz)} className="bg-blue-500 text-white px-3 rounded hover:bg-blue-800">Add Questions</button>
                 </div>
              </div>
        </div>
    )
}

export default SingleQuizTile;