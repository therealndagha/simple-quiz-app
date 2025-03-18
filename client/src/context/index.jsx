// QuizContextProvider Component
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const QuizContext = createContext(null);

const QuizContextProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();
    const [config, setConfig] = useState({});
    const [quizzes, setQuizzes] = useState([]);
    const [currentQuiz, setCurrentQuiz] = useState({});
    const [questions, setQuestions] = useState([]);
    const [totalPoints, setTotalPoints] = useState(0);
    const [finalGrade, setFinalGrade] = useState(0);
    const [hasCreatedQuiz, setHasCreatedQuiz] = useState(false);

    useEffect(() => {
        const getTokenFromLocalStorage = localStorage.getItem('accessToken');
        if (!getTokenFromLocalStorage && window.location.pathname !== '/register') {
            navigate('/');  // Only navigate if not on /register or /test
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
    }, [navigate]);
    
    const [createQuizFormData, setCreateQuizFormData] = useState({
        title: '',
        description: ''
    });

    const handleOnChangeCreateQuizFormData = (event) => {
        const { name, value } = event.target;
        setCreateQuizFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const submitCreateQuizFormData = (event) => {
        event.preventDefault();
        const url = 'http://127.0.0.1:3000/quiz/quizzes';

        axios.post(url, createQuizFormData, config)
            .then(response => {
                alert('Quiz created successfully');
                setHasCreatedQuiz(true);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
                alert(error.response.data.message);
                setHasCreatedQuiz(false);
            });
    };

    return (
        <QuizContext.Provider value={{
            submitCreateQuizFormData,
            hasCreatedQuiz,
            questions,
            setQuestions,
            handleOnChangeCreateQuizFormData,
            createQuizFormData,
            config,
            quizzes,
            setQuizzes,
            navigate,
            currentQuiz,
            setCurrentQuiz,
            totalPoints,
            setTotalPoints,
            finalGrade,
            setFinalGrade
        }}>
            {children}
        </QuizContext.Provider>
    );
};

export default QuizContextProvider;
