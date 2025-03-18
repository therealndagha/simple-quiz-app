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

      // Assuming the access token is available in response.data.accessToken
      const accessToken = response.data.accessToken;

      // Store the access token in localStorage
      localStorage.setItem("accessToken", JSON.stringify(accessToken));

      // Show success message
      setMessage("Login Successful! ");
      setIsError(false);

      // Redirect to dashboard
      navigate("/dashboard");

      //console.log("Login Successful:", response.data);
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
    <div>
      <h2 className="text-3xl text-center">Login User</h2>

      {message && (
        <p className={`text-center p-2 ${isError ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="p-3 shadow text-center m-5">
        <div className="m-3 border p-3">
          <input
            placeholder="Enter your email"
            name="email"
            type="email"
            onChange={handleOnChange}
            value={loginFormData.email}
          />
        </div>

        <div className="m-3 border p-3">
          <input
            placeholder="Enter your password"
            type="password"
            name="password"
            onChange={handleOnChange}
            value={loginFormData.password}
          />
        </div>

        <div className="text-center">
          <button
            className="bg-blue-500 text-white mx-3 px-3 rounded hover:bg-blue-900 pb-2"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>

      <div className="text-center">
      <button
  onClick={() => {
    console.log('Navigating to /register');
    navigate('/register');
  }}
  className="text-blue-500 hover:text-blue-800 mt-3"
>
  Don't have an account? Click Here
</button>

      </div>

    </div>
  );
};

export default Login;
