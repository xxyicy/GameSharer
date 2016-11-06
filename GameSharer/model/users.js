var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	username: { type: String, unique: true },
	email: String,
	firstName: String,
	lastName: String,
	avatarUrl: String,
	password: String,
	phoneNumber: String,
  description: String
});

module.exports = mongoose.model('User', UserSchema);






