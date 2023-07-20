import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useCookies} from 'react-cookie';
import { useGetUserID } from '../hooks/useGetUserID';

const CreateRecipe = () => {

  const userID = useGetUserID();

  const navigate = useNavigate();
  // const {cookies , setCookies} = useCookies(["access_token"])
  const [cookies, _] = useCookies(["access_token"]);


  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handleChange = (e)=>{
    const{name , value} = e.target;
    setRecipe({...recipe , [name] : value});
  }

  const handleIngredientChange = (e , ind)=>{
    const {value} = e.target;
    const ingredients  = [...recipe.ingredients];
    ingredients[ind] = value;
    setRecipe({...recipe , ingredients})
  }

  

  const handleAddIngredient = (e) =>{
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  }


  const handleSubmit = async(event) =>{
      event.preventDefault();
      try{
        await axios.post("http://localhost:2000/recipes",
        {...recipe},
        {
          // headers : {authorization : cookies.access_token}
          headers: { authorization: cookies.access_token },

        });
        
        console.log(recipe);
        alert("New Recipe Created!");
        navigate("/");
      }catch(err){
        alert(err);
        console.log(err);
      }
  };

  return (
    <div>
      <h2>Create Form</h2>

      <form className='login-form' onSubmit={handleSubmit}>
        <div className='inner-login'>
          <label>Name : </label>
          <input type="text" name='name' value={recipe.name} onChange={handleChange} />
        </div>

        <div className='inner-login'>
          <label>Description : </label>
          <textarea type="text" name='description' value={recipe.description} onChange={handleChange}/>
        </div>

        <div className='inner-login'>
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
           <input
           key={index}
           type="text"
           name="ingredients"
           value={ingredient}
           onChange={(event) => handleIngredientChange(event, index)}
         />
       ))}
       <button type="button" onClick={handleAddIngredient}>
         Add Ingredient
       </button>
        </div>

        <div className='inner-login'>
          <label>Instructions : </label>
          <textarea  name='instructions' value={recipe.instructions} onChange={handleChange}/>
        </div>

        <div className='inner-login'>
          <label>Image URL : </label>
          <input type="text" name='imageUrl' value={recipe.imageUrl} onChange={handleChange}/>
        </div>

        <div className='inner-login'>
          <label>Cooking Time : </label>
          <input type="number" name='cookingTime' value={recipe.cookingTime} onChange={handleChange}/>
        </div>

         <button type='submit'>Submit</button>   
      </form>
    </div>
  )
}

export default CreateRecipe