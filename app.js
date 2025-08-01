const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");

const app = express();

const MONGODB_URI = "mongodb://127.0.0.1:27017/express-mongoose-recipes-dev";

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// Iteration 1 - Connect to MongoDB
// DATABASE CONNECTION
mongoose
  .connect(MONGODB_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
//  POST  /recipes route

app.post("/recipes", (req, res) => {
  const newRecipe = req.body;

  Recipe.create(newRecipe)
  .then((savedRecipe)=>{
    res.status(201).json(savedRecipe); 
    })
    .catch((error) => {
      console.error("Error creating recipe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });

});

//  Iteration 4 - Get All Recipes
//  GET  /recipes route

app.get("/recipes", (req, res) =>{
    Recipe.find()
    .then((recipe)=>{
        res.status(201).json(recipe); 
    })
    .catch((error) => {
      console.error("Error getting recipe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });

})

//  Iteration 5 - Get a Single Recipe
//  GET  /recipes/:id route

app.get("/recipes/:recipeId", (req, res) =>{

    const {recipeId} = req.params;
    
    Recipe.findById(recipeId)
    .then((recipe)=>{
        res.status(201).json(recipe); 
    })
    .catch((error) => {
      console.error("Error getting recipe by Id:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });

})


//  Iteration 6 - Update a Single Recipe
//  PUT  /recipes/:id route

app.put("/recipes/:recipeId", (req, res) =>{
    
    const newRecipe = req.body;

    const {recipeId} = req.params;
    
    Recipe.findByIdAndUpdate(recipeId, newRecipe, {new:true} )
    .then((recipe)=>{
        res.status(201).json(recipe); 
    })
    .catch((error) => {
      console.error("Error updating recipe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});
//  Iteration 7 - Delete a Single Recipe
//  DELETE  /recipes/:id route

app.delete("/recipes/:recipeId", (req, res) =>{
    
    const newRecipe = req.body;

    const {recipeId} = req.params;
    
    Recipe.findByIdAndDelete(recipeId, newRecipe, {new:true} )
    .then((recipe)=>{
        res.status(201).json(recipe); 
    })
    .catch((error) => {
      console.error("Error deleting recipe:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
