mongoose = require('mongoose');
const GlossarySchema = new mongoose.Schema({
  title : {type:String, required: true},
  definition: String, 
  userLevel : {type: Number, default : 2},
  usage: String
});

module.exports = mongoose.model('glossary', GlossarySchema);