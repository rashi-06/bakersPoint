import express  from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/User.js";


const router = express.Router();


router.get("/" , async(req,res)=>{
    try{
        const res = await RecipeModel.find({});
        res.status(200).json(res);
    }catch(err){
        res.status(500).json(err);
    }

})


router.post("/createRecipe", async(req ,res) =>{
    const newRecipe = req.body;
    try{
        const respo = await newRecipe.save();
        res.json(respo);
    }catch(err){
        res.json(err);
    }

})

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
        user.savedRecipe.push(recipe);
        user.save();
        res.json({savedRecipe : user.savedRecipe})
    }catch (error) {
        res.json(err);
    }
})



router.get("/savedRecipes/ids" , async(req,res) =>{
    try {
        const user = await UserModel.findById();
        res.json({savedRecipes : user?.savedRecipes});
    } catch (error) {
        res.json(err);
    }
})

router.get("/savedRecipes" , async(req,res) =>{
    try {
        const user = await UserModel.findById();
        const savedRecipes = await RecipeModel.find({
            _id : {$in: user.savedRecipes}
        })
        res.json({savedRecipes});
    } catch (error) {
        res.json(err);
    }
})

export {router as recipesRouter};