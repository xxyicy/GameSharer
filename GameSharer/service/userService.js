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

var getUser = function(uid, next) {
  if (!uid) {
    return next(utils.fail("missing user id"));
  }
  mongoose.model('User').findById(uid, function(err, user) {
    user.password = "";
    if (err) {
      return next(utils.fail(err.code))
    }
    next(utils.succ(user))
  })
}

var updateUser = function(data, next) {
  //TODO data assertion
  if (!data.uid) {
    return next(utils.fail("missing user id"));
  }
  mongoose.model('User').findById(data.uid, function(err, user) {
    if (err) {
      return next(utils.fail(err.code))
    }
    var info = data.info;
    //TODO modify profile pic
    user.email = info.email || "";
    user.phoneNumber = info.phoneNumber || "";
    user.description = info.description || "";
    user.save(function(err) {
      if (err) {
        return next(utils.fail(err.code))
      }
      next(utils.succ("user info updated"))
    })
  })
}

module.exports = {
  createUser: createUser,
  getUser: getUser,
  updateUser: updateUser
}
