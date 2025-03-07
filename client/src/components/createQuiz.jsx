import { useContext } from "react";
import { QuizContext } from "../context";

const CreateQuiz = () =>{

    const  {submitCreateQuizFormData, handleOnChangeCreateQuizFormData, createQuizFormData} = useContext(QuizContext);
        //console.log(createQuizFormData)

    return <div className="p-3 m-3">
        <h2 className="text-3xl">Create New Quiz</h2>
        <form onSubmit={submitCreateQuizFormData}>
              
              <div className="m-3 p-3 border">
                 <input type="text" placeholder="Enter Quiz Title" value={createQuizFormData?.title} onChange={handleOnChangeCreateQuizFormData} name="title" className="p-3" required/>
              </div>

              <div className="p-3 m-3 border">
                 <input type="text" placeholder="Enter Quiz Description" value={createQuizFormData?.description} onChange={handleOnChangeCreateQuizFormData} name="description" className="p-3"  required/>
              </div>
                
              <div className="text-center p-3 m-3">
                  <button type="submit" className="bg-blue-500 text-white px-3 hover:bg-blue-800 rounded">Create Quiz</button>
              </div>

        </form>
    </div>
}

export default CreateQuiz;