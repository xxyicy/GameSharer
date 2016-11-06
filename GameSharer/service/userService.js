var mongoose = require('mongoose');
var userValidator = require('./validations/userValidator')
var utils = require('./utils/utils')
var passwordHash = require('password-hash')


var createUser = function (user, next) {
  var result = userValidator.validateUser(user);
  if (!result.succ) {
    return next(result);
  }
  user.password = passwordHash.generate(user.password);
  mongoose.model('User').create(user, function (err, user) {
    if (err) {
      if (err.code === 11000) {
        return next(utils.fail("Username already exists"));
      }
    }
    next(utils.succ(user));
  });
};

module.exports = {
  createUser: createUser
}
