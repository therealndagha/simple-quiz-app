import Dashboard from "./components/dashboard"
import Login from "./components/login"
import { Routes , Route} from "react-router-dom"

function App() {
   
  return (
    <>
      <h1 className="text-5xl text-center my-3">Simple Quiz App</h1>
      <div className="p-3">
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path = '/dashboard' element ={<Dashboard/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
