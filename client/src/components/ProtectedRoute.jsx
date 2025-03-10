import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const navigate = useNavigate();
    
    const token = localStorage.getItem('accessToken');
    if (!token) {
        return <Navigate to="/" />;
    }

    const parsedToken = JSON.parse(token);

    useEffect(() => {
        const accessProtectedRoute = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:3000/quiz/protected', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${parsedToken}`
                    }
                });

                if (response.status === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate('/dashboard');  // Redirect to dashboard if not authorized
                }
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/dashboard');  // Redirect on error
            }
        };

        accessProtectedRoute();
    }, [navigate, parsedToken]);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;  // Show a loading state while checking auth
    }

    return isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
