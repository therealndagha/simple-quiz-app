import AddQuestions from "./components/addQuestions"
import Dashboard from "./components/dashboard"
import Login from "./components/login"
import { Routes , Route} from "react-router-dom"
import RegisterUser from "./components/register"
import Admin from "./components/admin"
import AttemptQuiz from "./components/attemptQuiz"
import ProtectedRoute from "./components/ProtectedRoute"
import ViewQuizHistory from "./components/viewQuizHistory"
import { useEffect } from "react"
import TestPage from "./components/testPage"
import ViewHistoryOfAQuiz from "./components/ViewHistoryOfAQuiz"

function App() {
  
  
  return (
    <>
      <div className="p-3">
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path = '/dashboard' element ={<Dashboard/>} />
            <Route path="/add-questions/:quizId" element={<AddQuestions/>}/>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/history" element={<ViewQuizHistory/>} />
            <Route path="/history/:quizId" element={<ViewHistoryOfAQuiz/>}/>
            <Route path="/test" element={<TestPage/>}/>
            <Route path="/admin" element ={
               <ProtectedRoute>
                    <Admin/>
               </ProtectedRoute>
            }/> 
            <Route path="/attempt-quiz/:quizId" element={<AttemptQuiz/>}/>
            <Route path="*" element={<h1>Page Not Found</h1>} />

        </Routes>
      </div>
    </>
  )
}

export default App
