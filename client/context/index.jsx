import axios from "axios";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";


export const QuizAppContext = createContext(null);



const QuizAppContextProvider = ({children}) =>{
 
       const [createQuizFormData, setCreateQuizFormData] = useState({
        title : '',
        description: ''
       });

         const navigate = useNavigate()

         const [createdQuizData, setCreatedQuizData] = useState({
            id: '',
            title: '',
            description:''
          })

       const handleOnChangeCreateQuiz = (event) =>{
        const {name, value} = event.target;
          setCreateQuizFormData({
            ...createQuizFormData, [name]:value
          })
       }

       const handleCreateQuizSubmit = (event) =>{
        event.preventDefault();
        const token = JSON.parse(localStorage.getItem('accessToken'));
        if(!token){
           navigate('/')
        }
        
        const createQuizURL = 'http://127.0.0.1:3000/quiz/quizzes';
     
        axios.post(createQuizURL, createQuizFormData, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
           // console.log(response.data);
            setCreatedQuizData({
                ...createdQuizData, id: response.data.newQuiz._id, title: response.data.newQuiz.title
            })
            console.log(createdQuizData)
        }).catch(error => console.log(error));
        

       }

         
    return (<QuizAppContext.Provider value={{createQuizFormData,  handleCreateQuizSubmit, setCreateQuizFormData, createdQuizData, handleOnChangeCreateQuiz}}>
        {children}
    </QuizAppContext.Provider>)
}

export default QuizAppContextProvider;