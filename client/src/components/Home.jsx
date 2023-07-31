import React, { useState, useEffect } from 'react'
import axios from "axios";
import {useGetUserID} from "../hooks/useGetUserID"
import "../css/home.css"


const Home = () => {
  
  const userID = useGetUserID();
  const [recipes , setRecipes] = useState([]);
  const [savedRecipes , setSavedRecipes] = useState([]);

  useEffect(() => {
    
    const fetchRecipes = async() =>{
      try {
        const res = await axios.get("http://localhost:2000/recipes");
        setRecipes(res.data);
        console.log(res.data);


      } catch (error) {
        console.log(error);
      }
    }

    const fetchAllSavedRecipes = async() =>{
      try {
        const res = await axios.get(`http://localhost:2000/recipes/savedRecipes/ids/${userID}`)
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    
    fetchRecipes();
    fetchAllSavedRecipes();


  }, [])




  const saveRecipe = async(recipeID) =>{
      try {

        const res = await axios.put(`http://localhost:2000/recipes` , {recipeID , userID});
        console.log(recipes);
        setSavedRecipes(res.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
  }

  const isRecipeSaved = (recipeID) => savedRecipes.includes(recipeID);

  


  return (
    <div className='container'>
       <h1>Recipes</h1>
      <ul className='list_items'>
        {recipes.reverse().map((recipe) => (
          <li className='list_ele' key={recipe._id}>
            <div >
              <h2>{recipe.name}</h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
            {/* {recipe.instructions.map((r)=>(
              <ul>
                <li>{r.instructions}</li>
              </ul>
            ))}   */}
            <div>
              <ul>
              {recipe.ingredients.map((element) =>
                <li className='all-recipes'>{element}</li>
              )}
              </ul>
            </div>
            
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} minutes</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home