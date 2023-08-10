import React, {useState} from 'react'
import { useNavigate , Link} from 'react-router-dom';
import axios from 'axios';


const Register = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState("");
    const [password , setPassword] = useState("");
    const [cpass ,setCpass] = useState("");
    const [passwordsMatch , setPasswordsMatch] = useState(false);

    const handleConfirmPasswordChange = (event) => {
        setCpass(event.target.value);
        // Check if passwords match whenever confirm password field changes
        setPasswordsMatch(event.target.value === password);
      };

    const handleSubmit = async(e)=>{


        e.preventDefault();


         

        if(!passwordsMatch)alert("Password doesn't matched") 
        else{
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
         
    }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center bg-white-500'>
        <h1 className='text-3xl mb-9 mt-2 '>Register Page</h1>
        <form className='w-full  max-w-sm sm:w-1/2 items-center border-red-400 '>
            <div className='my-2'><label>Username : </label></div>
            <div>    
                <input 
                    className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mt-2 mb-5'
                    type="text" name='userName'placeholder='xyz@gmail.com' onChange={(e)=>setUserName(e.target.value)}/>
            </div>

            <div className='my-2'><label>Password : </label></div>
            <div>
                <input 
                className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mt-2 mb-5'
                type="password" name='password'placeholder='**************' onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className='my-2'><label>Confirm Password : </label></div>
            <div>
                <input 
                className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 mt-2 mb-5'
                type="password" name='password'placeholder='**************' onChange={handleConfirmPasswordChange} />
            </div>

            {!passwordsMatch && <p className='text-red-500 pb-2 '>Passwords do not match</p>}
            {passwordsMatch && <p className='text-green-500 pb-2'>Passwords match</p>}

            <div className='flex justify-center items-center'>
                <button className='bg-yellow-300 rounded-lg p-2' onClick={handleSubmit}>Submit</button>
            </div>
        </form>
        
        <div className='m-2'>Already have an account?
            <Link to={"/login"} className='hover:bg-yellow-100' > Login</Link>
        </div>

    </div>
  )
}

export default Register