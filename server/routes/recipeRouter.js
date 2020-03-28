const RecipeController = require('../controllers/RecipeController.js');
const express = require('express'); 
const RecipeRouter = express.Router()

//returns all entries, vanilla get request
// GET: /api/Recipe/
RecipeRouter.get('/', RecipeController.getAll)

//calls create, request should send entry in req.body
// POST: /api/Recipe/
RecipeRouter.post('/', RecipeController.create);

//calls update, request should send updated entry in req.body and have url param :title
// PUT: /api/Recipe/:title
RecipeRouter.put('/:title', RecipeController.update);

//calls read, request should include url param :title for entry to grab
// GET: /api/Recipe/:title
RecipeRouter.get('/:title', RecipeController.read);

//calls remove, request should include url param :title for entry to remove
// DELETE: /api/Recipe/:title
RecipeRouter.delete('/:title', RecipeController.remove);

// returns all ingredients of a given recipe's title
// GET: /api/Recipe/:title/ingredients
RecipeRouter.get('/:title/ingredients', RecipeRouter.getAllIngredients);
  
module.exports = RecipeRouter;