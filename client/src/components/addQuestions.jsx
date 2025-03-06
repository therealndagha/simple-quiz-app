import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QuizAppContext } from "../../context";

const AddQuestions = () => {
  const navigate = useNavigate();

  const {createQuizFormData,  handleCreateQuizSubmit, createdQuizData, handleOnChangeCreateQuiz} = useContext(QuizAppContext);

  
  

  const logoutUser = () =>{
     localStorage.removeItem('accessToken');
     navigate('/')
  }

  const [question, setQuestion] = useState({
    questionText: "",
    correctAnswer: "",
  });

  const [errMessage, setErrMessage] = useState(null)

  const [access, setAccess] = useState(null);
   
  const addQuestions_url = "http://127.0.0.1:3000/quiz/questions";

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (!storedToken) {
      navigate("/");
      return;
    }

    try {
      const token = JSON.parse(storedToken);
      setAccess(token);
      axios.get('http://127.0.0.1:3000/quiz/protected', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }).then(response => console.log(response.data)).catch(error => {console.log(error.response.data)
        navigate('/')
      })
    } catch (error) {
      console.error("Error parsing token:", error);
      navigate("/");
    }
  }, []);

  const [options, setOptions] = useState({
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleOptionsOnChange = (event) => {
    const { name, value } = event.target;
    setOptions((prevOption) => ({
      ...prevOption,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!access) {
      console.error("No access token found");
      return;
    }

    const { option1, option2, option3, option4 } = options;
    const updatedOptions = [option1, option2, option3, option4];

    const {questionText, correctAnswer } = question;

    const requestData = {
      quizId : createQuizFormData.id,
      questionText,
      options: updatedOptions,
      correctAnswer,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    };

    try {
      const response = await axios.post(addQuestions_url, requestData, config);
      console.log("Response:", response.data);
      setErrMessage(null)
    } catch (error) {
      console.error(
        "Error submitting question:",
        error.response ? error.response.data : error.message
      );
      setErrMessage(error.response.data.message)
    }
  };

  return (
    <>
        <div className="p-3 m-3">
            <h2 className="text-2xl">Create Quiz</h2>
             <form onSubmit={handleCreateQuizSubmit}>
                 <div className="m-3 p-3 text-center shadow border">
                    <input type="text" name="title" value={createQuizFormData.title} onChange={handleOnChangeCreateQuiz} placeholder="Enter quiz title" className="p-3" required/>
                 </div>

                 <div className="m-3 p-3 text-center shadow border">
                    <input type="text" name="description" value={createQuizFormData.description} onChange={handleOnChangeCreateQuiz} placeholder="Enter quiz description" className="p-3" required/>
                 </div>
                      <div className="text-center"> 
                          <button type="submit" className="bg-blue-500 hover:bg-blue-800 rounded px-3 mx-3 text-white">Submit</button>
                      </div>
             </form>
        </div>
      
      <h2 className="text-2xl">Add Questions</h2>


      {
        errMessage ? <p className="text-red-500">{errMessage}</p> : null
      }
      <form onSubmit={handleSubmit}>
        <div className="m-3 p-3 text-center shadow border">
          <input
            type="text"
            onChange={handleOnChange}
            name="quizId"
            placeholder="Enter quizId"
            value={createdQuizData.id}
          />
        </div>

        <div className="m-3 p-3 text-center shadow border">
          <input
            type="text"
            className="w-full p-2 text-center"
            onChange={handleOnChange}
            name="questionText"
            placeholder="Enter question"
            value={question.questionText}
            required
          />
        </div>

        <div className="m-3 p-3 text-center shadow-md bg-slate-50 hover:bg-slate-100">
          <input
            type="text"
            className="p-2"
            onChange={handleOptionsOnChange}
            name="option1"
            placeholder="Enter option 1"
            value={options.option1}
            required
          />
        </div>

        <div className="m-3 p-3 text-center shadow-md bg-slate-50 hover:bg-slate-100">
          <input
            type="text"
            className="p-2"
            onChange={handleOptionsOnChange}
            name="option2"
            placeholder="Enter option 2"
            value={options.option2}
            required
          />
        </div>

        <div className="m-3 p-3 text-center shadow-md bg-slate-50 hover:bg-slate-100">
          <input
            type="text"
            className="p-2"
            onChange={handleOptionsOnChange}
            name="option3"
            placeholder="Enter option 3"
            value={options.option3}
            required
          />
        </div>

        <div className="m-3 p-3 text-center shadow-md bg-slate-50 hover:bg-slate-100">
          <input
            type="text"
            className="p-2"
            onChange={handleOptionsOnChange}
            name="option4"
            placeholder="Enter option 4"
            value={options.option4}
            required
          />
        </div>

        <div className="m-3 p-3 text-center shadow border">
          <input
            type="text"
            className="p-2"
            onChange={handleOnChange}
            name="correctAnswer"
            placeholder="Enter correct answer"
            value={question.correctAnswer}
            required
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-800 text-white px-3 mx-3 rounded"
          >
            Submit Question
          </button>
        </div>
      </form>

      <div className="text-center mt-3">
          <button onClick={logoutUser} className="bg-blue-500 text-white px-3 mx-3 hover:bg-blue-800 rounded">logout</button>
      </div>
    </>
  );
};

export default AddQuestions;
