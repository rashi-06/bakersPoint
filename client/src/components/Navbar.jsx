import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie';
import "../App.css"
import { useState } from 'react'

const Navbar = () => {
  const [mobileMenu , setMobileMenu] = useState(false);
  const [cookies , setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const toggleMoblieMenu = ()=>{
    setMobileMenu(!mobileMenu);
  }


  const logout = ()=>{
    setCookies("access_token" , "");
    window.localStorage.clear();
    navigate("/login");

  }

  return (
    <header className='w-full bg-white shadow m-0 p-0'>
        <div className='justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8'>
          <div>
            <div className='flex items-center justify-between py-3 md:py-5 md:block'>
                <Link to={"/"} className='text-2xl font-bold'>Baker's Point</Link>
            </div>
    {/* //toggle button */}
            <div className='md:hidden'>
              <button className=' className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                onClick={toggleMoblieMenu}>
                  {mobileMenu?(
                    <svg xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ):(
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>)}
                </button>
            </div>
          </div>
        </div>
        <div className='nav-links ${mobileMenu ? "block" : "hidden"}'>
            <Link to={"/"} className='links sm:hidden md:hidden'>Home</Link>
            <Link to={"/createRecipe"} className='links'>CreateRecipe</Link>
            <Link to={"/savedRecipes"} className='links'>SavedRecipes</Link>
            {!cookies.access_token ? (<Link to={"/login"} className='links'>Login</Link>):(
              <button onClick={logout}>Logout</button>
            )} 

         </div>

        {/* <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                mobileMenu ? "block" : "hidden"}`}>
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-gray-600 hover:text-blue-600">
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <Link to={"/createRecipe"}>Create Recipe</Link>
                            </li>
                            <li className="text-gray-600 hover:text-blue-600">
                                <Link to={"/savedRecipes"}>Saved Recipes</Link>
                            </li>
                            {!cookies.access_token ? (<Link to={"/login"} className='links'>Login</Link>):(
                              <button onClick={logout}>Logout</button>
                            )}
                        </ul>
                    </div> */}
                {/* </div> */}
            {/* </div> */}
    </header>
  )
}

export default Navbar