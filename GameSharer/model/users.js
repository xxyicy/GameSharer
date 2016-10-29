var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
	email: String,
	firstName: String,
	lastName: String,
	nickName: String,
	cookie: String,
	contactInfo: String,
	avatarUrl: String
});

module.exports = mongoose.model('User', UserSchema);






