import { useContext } from "react"
import { QuizContext } from "../../context"


const LogOutuser = () =>{
    const {logOut} = useContext(QuizContext);
    return <div className="p-3 text-center">
         <button onClick={logOut}  className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-800">LOG OUT</button>
    </div>
}

export default LogOutuser;