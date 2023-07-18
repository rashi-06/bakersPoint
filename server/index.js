import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/Recipes.js";
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });


const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());


app.use("/auth" , userRouter)
app.use("/recipes", recipesRouter);


app.listen(PORT , ()=>{
    console.log(`server is running on port : ${PORT}`);
})


app.get("/", (req,res)=>{
    console.log("Hellooooooo");
    res.send("<h1>Hi</h1>")
})

mongoose.connect(process.env.MONOGODB_URL  ,{
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(()=>{
    console.log("Connected to the mongodb database");
}).catch((err)=>{
    console.log(err);
})