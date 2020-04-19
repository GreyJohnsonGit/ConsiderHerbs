mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  description : String,
  ingredients: [{  
    amount: String,
    unit: String,
    ingredient  : String
  }],
  ailment : String,
  bodypart  : String,
  id  : String,
  userLevel : {type: Number, default : 3},
  name : String
});
  
module.exports = mongoose.model('Recipe', RecipeSchema);