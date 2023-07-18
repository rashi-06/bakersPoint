import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import "../App.css"

const Navbar = () => {

  const [cookies , setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = ()=>{
    setCookies("access_token" , "");
    window.localStorage.clear();
    navigate("/login");

  }

  return (
    <header className='nav'>
        <div className='nav-links name'>
          <Link to={"/"} className='links'>Baker's Point</Link>
        </div>
        <div className='nav-links'>
            <Link to={"/"} className='links'>Home</Link>
            <Link to={"/createRecipe"} className='links'>CreateRecipe</Link>
            <Link to={"/savedRecipes"} className='links'>SavedRecipes</Link>
            {!cookies.access_token ? (<Link to={"/login"} className='links'>Login</Link>):(
              <button onClick={logout}>Logout</button>
            )}

        </div>
    </header>
  )
}

export default Navbar