var utils = require('../utils/utils')

var validateUser = function(user) {
  if (!user.username) {
    return utils.fail("missing username")
  }
  if (!user.email) {
    return utils.fail("missing email")
  }
  if (!user.password) {
    return utils.fail("missing password")
  }
  if (!user.firstName) {
    return utils.fail("missing firstname")
  }
  if (!user.lastName) {
    return utils.fail("missing lastName")
  }
  return utils.succ(true);
}

var validateLogin = function(data) {
  if (!data.username) {
    return utils.fail("missing username")
  }
  if (!data.password) {
    return utils.fail("missing password")
  }
  return utils.succ(true)
}

module.exports = {
  validateUser : validateUser,
  validateLogin: validateLogin
}
