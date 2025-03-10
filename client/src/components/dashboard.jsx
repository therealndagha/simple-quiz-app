
import { useContext, useEffect,useState } from "react";

import UserAccessQuizzes from "./userAccessQuizzes";
import { QuizContext } from "../context";





const Dashboard = () =>{
    
  const {navigate , checkAdminAccess} = useContext(QuizContext);
       const logoutUser = () =>{
        localStorage.removeItem('accessToken');
        navigate('/')
       }
    return <>
        <div className="p-3">
            <h2 className="text-3xl">Dashboard</h2>

            <div className="text-center">
                <a onClick={()=>navigate('/admin')} className="bg-orange-400 rounded text-white px-3 hover:bg-orange-600">Go To Admin Dashboard</a>
            </div>
              <UserAccessQuizzes/>
            <div className="text-center">
                 <button onClick={logoutUser} className="bg-blue-600 hover:bg-blue-900 mx-4 p-3 text-white rounded">Log Out</button>
            </div>
        </div>
    </>
}

export default Dashboard;