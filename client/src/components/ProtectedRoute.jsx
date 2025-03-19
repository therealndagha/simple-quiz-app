import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    const fetchAuth = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/quiz/protected", {
          headers: { Authorization: `Bearer ${JSON.parse(token)}` },
        });
        setIsAuthenticated(response.status === 200);
      } catch {
        setIsAuthenticated(false);
      }
    };

    fetchAuth();
  }, [token]);

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/dashboard" />;
};

export default ProtectedRoute;
