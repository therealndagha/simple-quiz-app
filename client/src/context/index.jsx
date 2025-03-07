import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const QuizContext = createContext(null);


const QuizContextProvider = ({children}) =>{
     
       const [token, setToken] = useState(null);
       const navigate = useNavigate();
       const [config, setConfig] = useState({});
       const [quizzes, setQuizzes] = useState([]);
       const [currentQuiz, setCurrentQuiz] = useState({});
       const [questions, setQuestions] = useState([])

       useEffect(() => {
        const getTokenFromLocalStorage = localStorage.getItem('accessToken');
        if (!getTokenFromLocalStorage) {
            navigate('/');
        } else {
            const parsedToken = JSON.parse(getTokenFromLocalStorage);
            setToken(parsedToken);
            setConfig({
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${parsedToken}`
                }
            });
        }
    }, []);
    

    

    const [createQuizFormData, setCreateQuizFormData] = useState({
        title: '',
        description:''
    });

    const handleOnChangeCreateQuizFormData = (event) =>{
        const {name, value} = event.target;
        setCreateQuizFormData({
            ...createQuizFormData, [name]: value
        });
    }

    const submitCreateQuizFormData = (event) =>{
        event.preventDefault();
        const url = 'http://127.0.0.1:3000/quiz/quizzes';
        axios.post(url, createQuizFormData, config).then(response =>{
            alert('quiz created successfully')
            
            console.log(response.data)
        }).catch(error => console.log(error.response.data))
        
    }

      

    return (
        <QuizContext.Provider value={{submitCreateQuizFormData,questions, setQuestions, handleOnChangeCreateQuizFormData, createQuizFormData, config, quizzes, setQuizzes, navigate, currentQuiz, setCurrentQuiz}}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizContextProvider;