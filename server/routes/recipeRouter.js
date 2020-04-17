const RecipeController = require('../controllers/RecipeController.js');
const express = require('express'); 
const RecipeRouter = express.Router();

//Allows for Cross Domain Requests CORS
RecipeRouter.options('/', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//Allows for Cross Domain Requests CORS
RecipeRouter.options('/:name', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

RecipeRouter.options('/:name/ingredients', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
})

//returns all entries, vanilla get request
// GET: /api/Recipe/
RecipeRouter.get('/', RecipeController.getAll)

//calls create, request should send entry in req.body
// POST: /api/Recipe/
RecipeRouter.post('/', RecipeController.create);

//calls update, request should send updated entry in req.body and have url param :name
// PUT: /api/Recipe/:name
RecipeRouter.put('/:name', RecipeController.update);

//calls read, request should include url param :name for entry to grab
// GET: /api/Recipe/:name
RecipeRouter.get('/:name', RecipeController.read);

//calls remove, request should include url param :name for entry to remove
// DELETE: /api/Recipe/:name
RecipeRouter.delete('/:name', RecipeController.remove);

// returns all ingredients of a given recipe's name
// GET: /api/Recipe/:name/ingredients
RecipeRouter.get('/:name/ingredients', RecipeController.getAllIngredients);
  
module.exports = RecipeRouter;