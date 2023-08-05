// import React, {useState} from 'react'
// import {useNavigate} from 'react-router-dom';
// import axios from 'axios';
// import {useCookies} from 'react-cookie';
// import { useGetUserID } from '../hooks/useGetUserID';
// import "../css/home.css"

// const CreateRecipe = () => {

//   const userID = useGetUserID();

//   const navigate = useNavigate();
//   // const {cookies , setCookies} = useCookies(["access_token"])
//   const [cookies, _] = useCookies(["access_token"]);

//   // const [richText, setRichText] = useState('');

//   // const handleEditorChange = (content) => {
//     // setRichText(content);
//   // };


//   const [recipe, setRecipe] = useState({
//     name: "",
//     description: "",
//     ingredients: [],
//     instructions: "",
//     imageUrl: "",
//     cookingTime: 0,
//     userOwner: userID,
//   });

//   const handleChange = (e)=>{
//     const{name , value} = e.target;
//     setRecipe({...recipe , [name] : value});
//   }

//   const handleIngredientChange = (e , ind)=>{
//     const {value} = e.target;
//     const ingredients  = [...recipe.ingredients];
//     ingredients[ind] = value;
//     setRecipe({...recipe , ingredients})
//   }

  

//   const handleAddIngredient = (e) =>{
//     const ingredients = [...recipe.ingredients, ""];
//     setRecipe({ ...recipe, ingredients });
//   }


//   const handleSubmit = async(event) =>{
//       event.preventDefault();
//       try{
//         await axios.post("http://localhost:2000/recipes",
//         {...recipe},
//         {
//           headers: { authorization: cookies.access_token },

//         });
        
//         console.log(recipe);
//         alert("New Recipe Created!");
//         navigate("/");
//       }catch(err){
//         alert(err);
//         console.log(err);
//       }
//   };

//   return (
//     <div className='container' >
//       <h2>Create Form</h2>

//       <form className='' onSubmit={handleSubmit}>
//         <div className='inner-create'>
//           <label>Name : </label>
//           <input className='w-64' type="text" name='name' id="name" value={recipe.name} onChange={handleChange} />
//         </div>

//         <div className='inner-create'>
//           <label>Description : </label>
//           <textarea type="text" name='description' id='description' value={recipe.description} onChange={handleChange}/>
//         </div>

//         <div className='inner-create'>
//           <label htmlFor="ingredients">Ingredients</label>
//           {recipe.ingredients.map((ingredient, index) => (
//            <input
//            key={index}
//            type="text"
//            name="ingredients"
//            id="ingredients"
//            value={ingredient}
//            onChange={(event) => handleIngredientChange(event, index)}
//          />
//        ))}
//        <button type="button" onClick={handleAddIngredient}>
//          Add Ingredient
//        </button>
//         </div>

//         <div className='inner-create'>
//           <label>Instructions : </label>
//           <textarea
//             name='instructions' value={recipe.instructions} onChange={handleChange}/>
//         </div>  
          

//         <div className='inner-create'>
//           <label>Image URL : </label>
//           <input type="text" name='imageUrl' value={recipe.imageUrl} onChange={handleChange}/>
//         </div>

//         <div className='inner-create'>
//           <label>Cooking Time : </label>
//           <input type="number" name='cookingTime' id='cookingTime' value={recipe.cookingTime} onChange={handleChange}/>
//         </div>

//          <button type='submit'>Submit</button>   
//       </form>
//     </div>
//   )
// }

// export default CreateRecipe


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
    <div className='w-full '>
      <h2>Create Form</h2>

      <form className='create-form  shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
        <div className='mb-4 w-full'>
          <label>Name: </label>
          <input
            className='w-60 h-12 px-5 mx-5 rounded-lg'
           type="text" name='name' id="name" value={recipe.name} onChange={handleChange} />
        </div>

        <div  className='mb-4 w-full'>
          <label className='m'>Description : </label>
          <textarea 
            className='w-60 h-12 px-5 mx-5 my-5 rounded-lg'
          type="text" name='description' id='description' value={recipe.description} onChange={handleChange}/>
        </div>

        <div className='inner-create'>
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
           <input
           className='w-60 h-12 px-5 mx-5 my-5 rounded-lg'
           key={index}
           type="text"
           name="ingredients"
           id="ingredients"
           value={ingredient}
           onChange={(event) => handleIngredientChange(event, index)}
         />
       ))}
       <button 
        className='bg-blue-500 rounded-lg mx-5 p-1 rounded-lg'
       type="button" onClick={handleAddIngredient}>
         Add Ingredient
       </button>
        </div>

        <div className='inner-create'>
          <label>Instructions : </label>
          <textarea  
            className='w-60 h-12 px-5 mx-5 my-5 rounded-lg'
          name='instructions' value={recipe.instructions} onChange={handleChange}/>
        </div>

        <div className='inner-create'>
          <label>Image URL : </label>
          <input 
             className='w-60 h-12 px-5 mx-5 my-5 rounded-lg'
          type="text" name='imageUrl' value={recipe.imageUrl} onChange={handleChange}/>
        </div>

        <div className='inner-create'>
          <label>Cooking Time : </label>
          <input 
             className='w-60 h-12 px-5 mx-5 my-5 rounded-lg'
            type="number" name='cookingTime' id='cookingTime' value={recipe.cookingTime} onChange={handleChange}/>
        </div>

         <button className='bg-blue-500 rounded-lg m-2 p-2 text-xl' type='submit'>Submit</button>   
      </form>
    </div>
  )
}

export default CreateRecipe