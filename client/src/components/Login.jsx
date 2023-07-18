import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import {useCookies} from 'react-cookies'
import { useCookies } from "react-cookie";
import "../App.css"

const Login = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [cookies, setCookies] = useCookies(["access_token"]);


    const handleSubmit = async(e)=>{
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:2000/auth/login" , {
                userName,
                password
            })
            setCookies("access_token" , res.data.token);
            window.localStorage.setItem("userID" , res.data.userID);
            navigate("/");

        } catch (error) {
            alert(error);
        }
    }

  return (
    <div>
        <h2>Login Page</h2>
        <form className='login-form'>
            <div className='inner-login'>
                <label>Username : </label>
                <input type="text" name='userName' placeholder='xyz@gmail.com' onChange={(e)=>setUserName(e.target.value)}/>
            </div>

            <div className='inner-login'>
                <label>Password : </label>
                <input type="password" name='password' placeholder='****' onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button className='inner-login button' onClick={handleSubmit}>Submit</button>
        </form>
        
        <div>Didn't have an account ?
            <Link to={"/register"}>Register</Link>
        </div>

    </div>
  )
}

export default Login