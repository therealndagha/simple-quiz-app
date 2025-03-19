import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/auth/login",
        loginFormData
      );

      const accessToken = response.data.accessToken;
      localStorage.setItem("accessToken", JSON.stringify(accessToken));

      setMessage("Login Successful!");
      setIsError(false);
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid credentials. Please try again."
      );
      setIsError(true);
      console.error("Login Error:", error.response?.data || error.message);
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Login</h2>

        {message && (
          <p className={`text-center p-2 rounded-lg ${isError ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              placeholder="Enter your email"
              name="email"
              type="email"
              onChange={handleOnChange}
              value={loginFormData.email}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              placeholder="Enter your password"
              type="password"
              name="password"
              onChange={handleOnChange}
              value={loginFormData.password}
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-800 transition-all duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 hover:underline ml-1"
          >
            Sign up here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
