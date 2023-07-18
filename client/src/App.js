import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes , Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./components/Home";
import SavedRecipes from './components/SavedRecipes';
import CreateRecipe from './components/CreateRecipe';
import Login from './components/Login';
import Register from './components/Register';


function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar/>
        <Routes>
          <Route path ="/" element= {<Home />}/>
          <Route path="/createRecipe" element={<CreateRecipe />} /> 
          <Route path="/savedRecipes" element={<SavedRecipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
      </Router>
    </div>
      
  );
}

export default App;
