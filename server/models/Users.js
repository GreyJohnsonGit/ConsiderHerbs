mongoose = require('mongoose');
bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username : {type:String, required: true},
  email : {type: String, required: true, unique: true },
  password : {type : String},
  method : {type: String, enum: ['Email', 'Google', 'Facebook']},
  id :  {type: String}
});

// Generates a hash for the password so it's encrypted
UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checks to make sure password is valid
UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// Checks if password was changed before saving
UserSchema.pre('save', function(next) {

  if(this.isModified('password')) {
      this.password = this.generateHash(this.password);
  }
  next();

});

module.exports = mongoose.model('user', UserSchema);