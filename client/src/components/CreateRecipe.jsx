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
    <div className='w-full h-full flex flex-col justify-center items-center bg-white-500'>
      <h1 className='text-3xl mb-9 mt-2'>Create Form</h1>

      <form className=' w-full  max-w-sm sm:w-1/2 border-red-400' onSubmit={handleSubmit}>
        
        <div className='my-2'><label>Name: </label></div>
        <div>
          <input
            required
            className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6'
           type="text" name='name' id="name" value={recipe.name} onChange={handleChange} />
        </div>

        <div  className='my-4'><label className='m'>Description : </label></div>
        <div>
          <textarea 
            className='block w-full rounded-md border-0 p-3 text-xl h-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6'
          type="text" name='description' id='description' value={recipe.description} onChange={handleChange}/>
        </div>

        <div className='my-4'>
          <label htmlFor="ingredients">Ingredients :</label>
        </div>
        <div>
          {recipe.ingredients.map((ingredient, index) => (
           <input
           className='block w-full rounded-md border-0 p-3 text-xl h-15 mb-2 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6'
           key={index}
           type="text"
           name="ingredients"
           id="ingredients"
           value={ingredient}
           onChange={(event) => handleIngredientChange(event, index)}
         />
       ))}
       
       <div className='flex justify-center items-center'>
          <button 
          className='bg-yellow-300 rounded-lg mx-5 p-2 itmes-center'
          type="button" onClick={handleAddIngredient}>
          Add Ingredient
          </button>
       </div>
       
        </div>

        <div className='my-4'>
          <label>Instructions : </label>
        </div>
        <div>
          <textarea  
            className='block w-full rounded-md border-0 p-3 text-xl h-25 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6'
          name='instructions' value={recipe.instructions} onChange={handleChange}/>
        </div>

        <div className='my-4'>
          <label>Image URL : </label>
        </div> 
        <div> 
          <input 
             className='block w-full rounded-md border-0 p-3 text-xl h-15 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6'
          type="text" name='imageUrl' value={recipe.imageUrl} onChange={handleChange}/>
        </div>

        <div className='my-4'>
          <label>Cooking Time : </label>
        </div>
        <div className='flex justify-center item-center'>
          <input 
             className='w-1/2 text-center rounded-md border-0 p-3 text-xl h-15 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6 my-4'
            type="number" name='cookingTime' id='cookingTime' value={recipe.cookingTime} onChange={handleChange}/>
        </div>

        <div className='flex justify-center items-center'>
           <button className='bg-yellow-300 rounded-lg m-2 p-2 text-xl items-center' 
            type='submit'>
              Create Recipe
           </button>  
        </div>

        
      </form>
    </div>
  )
}

export default CreateRecipe