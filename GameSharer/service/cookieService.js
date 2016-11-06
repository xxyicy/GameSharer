var mongoose = require("mongoose")
var utils = require("./utils/utils")



function removeCookie(cookieId, res) {
  mongoose.model('Cookie').remove({
    cookie: cookieId
    //TODO beneath !!!!
  }, function (err) {
    if (err) {
      console.log(err);
      return false;
    }
    res.clearCookie("uid");
    return true;
  })
}

module.exports = {
  removeCookie: removeCookie
}
