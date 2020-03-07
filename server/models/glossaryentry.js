mongoose = require('mongoose');
const GlossarySchema = new mongoose.Schema({
  title : {type:String, required: true},
  definition: String, 
  usage: String
});

module.exports = mongoose.model('glossary', GlossarySchema);