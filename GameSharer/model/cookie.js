var mongoose = require('mongoose');
var CookieSchema = new mongoose.Schema({
	uid: { type: String, unique: true },
	cookie: { type: String, unique: true },
    expire: Date,
});

module.exports = mongoose.model('Cookie', CookieSchema);