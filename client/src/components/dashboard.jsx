import { useContext } from "react";
import UserAccessQuizzes from "./userAccessQuizzes";
import { QuizContext } from "../context";

const Dashboard = () => {
  const { navigate } = useContext(QuizContext);

  const logoutUser = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard</h2>

        <div className="flex flex-col space-y-6">
          {/* Admin Dashboard Link */}
          <button
            onClick={() => navigate("/admin")}
            className="w-full bg-orange-400 text-white py-3 rounded-xl hover:bg-orange-600 transition-all duration-300"
          >
            Go To Admin Dashboard
          </button>

          {/* View Grades Link */}
          <button
            onClick={() => navigate("/history")}
            className="w-full bg-blue-400 text-white py-3 rounded-xl hover:bg-blue-600 transition-all duration-300"
          >
            View My Grades
          </button>

          {/* User Quizzes Section */}
          <div className="bg-gray-100 p-6 rounded-xl shadow-inner">
            <UserAccessQuizzes />
          </div>

          {/* Logout Button */}
          <button
            onClick={logoutUser}
            className="w-full bg-red-500 text-white py-3 rounded-xl hover:bg-red-700 transition-all duration-300"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
