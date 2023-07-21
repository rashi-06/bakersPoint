import express  from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/User.js";


const router = express.Router();


router.get("/", async (req, res) => {
    try {
      const result = await RecipeModel.find({});
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});


//create a new recipe
router.post("/", async(req ,res) =>{
    const newRecipe =  new RecipeModel(req.body);
    try{
        const respo = await newRecipe.save();
        console.log(res);
        res.json(respo);
    }catch(err){
        res.json(err);
    }

})


//get id of a specific recipe
router.get("/:recipeId", async (req, res) => {
    try {
      const result = await RecipesModel.findById(req.params.recipeId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  
  


//adding the recipe into the user array...
router.put("/" , async(req, res) =>{
    try{
        const user = await UserModel.findById(req.body.userID);
        const recipe = await RecipeModel.findById(req.body.recipeID);
        user.savedRecipes.push(recipe);
        user.save();
        res.json({savedRecipes : user.savedRecipes})
    }catch (error) {
        res.json(err);
    }
})


//get ids of saved recipes..
router.get("/savedRecipes/ids/:userID" , async(req,res) =>{
    try {
        const user = await UserModel.findById(req.params.userID);
        res.status(201).json({savedRecipes : user?.savedRecipes});
    } catch (error) {
        res.json(err);
    }
})


//getting all the savedrecipes...
// router.get("/savedRecipes/:userID" , async(req,res) =>{
//     try {
//         const user = await UserModel.findById(res.params.userID);
//         const savedRecipes = await RecipeModel.find({
//             _id : {$in: user.savedRecipes}
//         })
//         res.json({savedRecipes});
//     } catch (error) {
//         res.json(error);
//     }
// })

router.get("/savedRecipes/:userId", async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.userId);
      const savedRecipes = await RecipeModel.find({
        _id: { $in: user.savedRecipes },
      });
  
      console.log(savedRecipes);
      res.status(201).json({ savedRecipes });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
export {router as recipesRouter};