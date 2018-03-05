var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username: String,
  password: String,
  admin: { type: Boolean, default: false}
});

// create new user document
User.statics.create = function(username, password){
  var user = new this({
    username,
    password
  });

  // return the Promise
  return user.save();
}

// find one user by using username
User.statics.findOneByUsername = function(username){
  return this.findOne({
    username
  }) .exec()
}

// verify the password of the User document
User.methods.verify = function(password){
  return this.password === password
}

User.methods.assignAdmin = function(){
  this.admin = true
  return this.save()
}

module.exports = mongoose.model('User', User)
