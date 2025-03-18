import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { QuizContext } from '../context';

const ViewHistory = () => {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);
    const { config } = useContext(QuizContext);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/quiz/history', {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('accessToken'))}`
                  }
                });
                if (response.data.success) {
                    setGrades(response.data.getGrades);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching grades:', error);
                alert('Error fetching quiz history.');
            } finally {
                setLoading(false);
            }
        };

        fetchGrades();
    }, [config]);

    if (loading) return <p>Loading your quiz history...</p>;

    if (grades.length === 0) return <p>No quiz history available. Try attempting a quiz!</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Quiz History</h2>
            {grades.map((grade) => (
                <div key={grade._id} className="border p-4 mb-4 rounded-lg shadow">
                    <p><strong>Quiz ID:</strong> {grade.quizId?._id || 'Unknown'}</p>
                    <p><strong>Score:</strong> {grade.finalGrade}</p>
                    <ViewAnswers quizId={grade.quizId?._id} />
                </div>
            ))}
        </div>
    );
};

const ViewAnswers = ({ quizId }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const { config } = useContext(QuizContext);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:3000/quiz/results/${quizId}`, config);
                if (response.data.success) {
                    setResults(response.data.results);
                } else {
                    alert(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching results:', error);
                alert('Error fetching answers.');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [quizId, config]);

    if (loading) return <p>Loading answers...</p>;

    if (results.length === 0) return <p>No answers available for this quiz.</p>;

    return (
        <div className="mt-4">
            <h3 className="text-lg font-semibold">Your Answers:</h3>
            {results.map((result) => (
                <div key={result._id} className="p-2 border rounded mt-2">
                    <p><strong>Question:</strong> {result.questionText || 'Unknown'}</p>
                    <p><strong>Your Answer:</strong> {result.submittedAnswer}</p>
                    <p><strong>Correct:</strong> {result.hasPassedThisQuestion ? 'Yes' : 'No'}</p>
                </div>
            ))}
        </div>
    );
};

export default ViewHistory;