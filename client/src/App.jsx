import AddQuestions from "./components/addQuestions"
import Dashboard from "./components/dashboard"
import Login from "./components/login"
import { Routes , Route} from "react-router-dom"
import RegisterUser from "./components/register"
import Admin from "./components/admin"

function App() {
   
  return (
    <>
      <h1 className="text-5xl text-center my-3">Simple Quiz App</h1>
      <div className="p-3">
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path = '/dashboard' element ={<Dashboard/>} />
            <Route path="/add-questions/:quizId" element={<AddQuestions/>}/>
            <Route path="/register" element={<RegisterUser/>}/>
            <Route path="/admin" element ={<Admin/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
