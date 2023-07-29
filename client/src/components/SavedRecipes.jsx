import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useGetUserID } from '../hooks/useGetUserID';

const SavedRecipes = () => {

  const [savedRecipes , setSavedRecipes] = useState([]);
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async() =>{
      try {
        const res = await axios.get(`http://localhost:2000/recipes/savedRecipes/${userID}`)
        console.log(res.data.savedRecipes);
        // setSavedRecipes(res.data.savedRecipes)
        {res.length > 0 ? setSavedRecipes(res.data.savedRecipes): setSavedRecipes(["No saved receipe"])};
      } catch (error) {
        console.log(error);
      }
    }

    fetchSavedRecipes();
  }, [])
  

  return (
    <div >
      <h1>Saved Recipes</h1>
  
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              {/* <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button> */}
            </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>

    </div>
  )
}

export default SavedRecipes