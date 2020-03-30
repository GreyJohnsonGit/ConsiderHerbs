mongoose = require('mongoose');
bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username : {type:String, required: true, unique: true},
  usertype : {type: String, enum: ['Admin', 'User', 'Subscriber']},
  email : {type: String, required: true, unique: true },
  password : {type : String},
  method : {type: String, enum: ['Email', 'Google', 'Facebook'], required: true},
  id :  {type: String}
});

// Generates a hash for the password
const hashPasswordSync = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Compares password to stored hash
const comparePasswordSync = (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

module.exports = mongoose.model('user', UserSchema);
module.exports.hashPasswordSync = hashPasswordSync;
module.exports.comparePasswordSync = comparePasswordSync;