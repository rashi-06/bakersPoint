import React, {useState} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const Register = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password , setPassword] = useState("");


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:2000/auth/register" , {
                userName,
                password
            })
           
            navigate("/");

        } catch (error) {
            alert(error);
        }
    }

  return (
    <div>
        <h2>Register Page</h2>
        <form className='login-form'>
            <div className='inner-login'>
                <label>Username : </label>
                <input type="text" name='userName'placeholder='xyz@gmail.com' onChange={(e)=>setUserName(e.target.value)}/>
            </div>

            <div className='inner-login'>
                <label>Password : </label>
                <input type="password" name='password'placeholder='****' onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className='inner-login button' onClick={handleSubmit}>Submit</button>
        </form>
        
        <div>Already have an account ?
            <Link to={"/login"}>Login</Link>
        </div>

    </div>
  )
}

export default Register