import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {UserModel} from "../models/User.js"
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

const router  = express.Router();


router.post("/register" , async(req ,res)=>{
    const{userName , password} = req.body;

    const user = await UserModel.findOne({userName});
    if(user)return res.json({"message" : "User already exist"});
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new UserModel({userName, password : hashedPassword});
    
    await newUser.save();
    
    res.json({"message" : "User created successfully !!!!"});
})

router.post("/login" , async(req,res)=>{
    const {userName , password} = req.body;
    const user = await UserModel.findOne({userName});
    if(!user){
        return res.json({"message" : "No user as such exist"});
    }

    const iSValidPassword = await bcrypt.compare(password , user.password);
    if(!iSValidPassword){
        return res.json({"message" : "Wrong password"});
    }
    const token = jwt.sign({id : user._id }, process.env.JWT );
    res.json({token, userID : user._id});


})


export {router as userRouter};