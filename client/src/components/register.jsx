import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    fullname: '',
    email: '',
    password: '',
    password1: '',
    password2: '',
  });

  const [errMessage, setErrMessage] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const register_api_url = 'http://127.0.0.1:3000/auth/register';

  const handleRegisterFormDataOnChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { fullname, email, password } = registerFormData;

    const data = { fullname, email, password, role: 'student' };

    try {
      await axios.post(register_api_url, data);
      setErrMessage(null);
      navigate('/');
    } catch (error) {
      console.error('Error:', error.response?.data);
      setErrMessage(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (registerFormData.password1 === registerFormData.password2) {
      setPasswordsMatch(true);
      setRegisterFormData({ ...registerFormData, password: registerFormData.password1 });
    } else {
      setPasswordsMatch(false);
      setRegisterFormData({ ...registerFormData, password: '' });
    }
  }, [registerFormData.password1, registerFormData.password2]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-xl rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800">Register</h2>

        {errMessage && <p className="text-red-500 bg-red-100 text-center p-2 rounded-lg">{errMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={registerFormData.fullname}
              onChange={handleRegisterFormDataOnChange}
              placeholder="Enter your fullname"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={registerFormData.email}
              onChange={handleRegisterFormDataOnChange}
              placeholder="Enter your email"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password1"
              value={registerFormData.password1}
              onChange={handleRegisterFormDataOnChange}
              placeholder="Enter a password"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={registerFormData.password2}
              onChange={handleRegisterFormDataOnChange}
              placeholder="Re-enter password"
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {!passwordsMatch && <p className="text-red-500 text-center">Passwords do not match</p>}

          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 text-white rounded-xl hover:bg-blue-800 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600">
          Already have an account?
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline ml-1"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
