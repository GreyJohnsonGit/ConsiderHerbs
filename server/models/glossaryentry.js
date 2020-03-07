mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title : {type: String, required: true}, 
  definition : {type: String, required: true},
  usage : {type: String}
} 
  );

module.exports = mongoose.model('Glossaries', schema);