import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
// import {useCookies} from 'react-cookies'
import { useCookies } from "react-cookie";
// import "../App.css"

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
    <div className='w-full h-full flex flex-col justify-center items-center bg-white-500 border-solid'>
        <h1 className='text-3xl mb-9 mt-2 '>Login Page</h1>
        
        <form className='w-full  max-w-sm sm:w-1/2 border-red-400 '  >
            
            <div className='my-2'><label>Username</label></div>
            <div>                
                <input 
                className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mt-2 mb-5' 
                type="text" name='userName' placeholder='xyz@gmail.com' onChange={(e)=>setUserName(e.target.value)}/>
            </div>

                
            <div className='my-2'><label>Password</label></div>
            <div>
                <input 
                className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mt-2 mb-5'
                type="password" name='password' placeholder='****' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            
            <div className='flex justify-center items-center'>
                <button className='bg-yellow-300 rounded-lg mx-5 p-2 items-center' onClick={handleSubmit}>Submit</button>
            </div>
        </form>
        
        <div className='m-5'>Didn't have an account ?
            <Link className='hover:bg-yellow-100' to={"/register"}>Register</Link>
        </div>
    </div>
  )
}

export default Login