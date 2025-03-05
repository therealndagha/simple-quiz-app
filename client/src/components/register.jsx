import axios from 'axios'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const RegisterUser = () =>{

    const navigate = useNavigate();

    const [registerFormData, setRegisterFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        password1: '',
        password2: '',
    })
     
    const [errMessage, setErrMessage] = useState(null);

    //console.log(registerFormData)

    const [passwordsMatch, setPasswordsMatch] = useState(true)

    const register_api_url = 'http://127.0.0.1:3000/auth/register'
   
    const handleRegisterFormDataOnChange = (event) =>{
        const {name, value} = event.target;
        setRegisterFormData({...registerFormData, [name]:value})
    }

    const handleSubmit =  (event) =>{
        event.preventDefault()
        const {fullname, email, password} = registerFormData;
        const data = {
            fullname,
            email, 
            password, 
            role: 'student'
        }
        //console.log(data);
       
        axios.post(register_api_url, data).then(response => {
            console.log(response.data);
            setErrMessage(null)
            navigate('/');
        }).catch(error => {
            console.error('Error:',error.response.data );
           setErrMessage(error.response.data.message)
        })
    }

    useEffect(()=>{
        if(registerFormData.password1 === registerFormData.password2){
              setPasswordsMatch(true)
              setRegisterFormData({...registerFormData, password: registerFormData.password1})
        }
        else{
            setPasswordsMatch(false)
            setRegisterFormData({...registerFormData, password : ''})
        }
    }, [registerFormData?.password1, registerFormData?.password2])

    return <div className="text-center p-3 m-3 shadow border">
         <h2 className="text-2xl">Register</h2>
         <form onSubmit={handleSubmit}>

         <div className="m-3 p-3 shadow border"><input onChange={handleRegisterFormDataOnChange} type="text" name='fullname' value={registerFormData.fullname} placeholder='Enter your fullname' className="m-3 p-3" required /></div>
         <div className="m-3 p-3 shadow border"><input  onChange={handleRegisterFormDataOnChange} type="email" className="m-3 p-3" name='email' value={registerFormData.email} placeholder='Enter your email'  required/></div>
         <div className="m-3 p-3 shadow border"><input  onChange={handleRegisterFormDataOnChange} type="password" className="m-3 p-3"  name='password1' value={registerFormData.password1} placeholder='Enter a password' required /></div>
         <div className="m-3 p-3 shadow border"><input  onChange={handleRegisterFormDataOnChange} type="password" className="m-3 p-2 text-center " required value={registerFormData.password2} name='password2' placeholder='Re-enter password'/></div>

         <div>
            {
                !passwordsMatch ? <p className="text-red-500">passwords do not match</p> : null
            }
         </div>

          <div>
            <button type='submit' className='bg-blue-500 text-white rounded px-2 mx-2 hover:bg-blue-900'>register</button>
          </div>
         </form>
        <div>
            { 
                errMessage ? <p className='text-red-500 mt-3'>{errMessage}</p> : null
            }
        </div>
        <div className="text-center">
             <a onClick={()=>navigate('/')} className='mt-3 text-blue-500'>Already have an account ? Click Here!</a>
        </div>
    </div>
}


export default RegisterUser;