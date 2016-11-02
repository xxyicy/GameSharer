var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	email: String,
	firstName: String,
	lastName: String,
	contactInfo: String,
	avatarUrl: String
});

module.exports = mongoose.model('User', UserSchema);






