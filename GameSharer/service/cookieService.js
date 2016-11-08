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

function removeCookieWithUserIdIfExists(uid) {
  mongoose.model('Cookie').remove({
    uid: uid
  }, function(err) {
    if (err) {
      console.log("cookie not removed")
    } else {
      console.log("cookie removed")
    }
  })
}

module.exports = {
  removeCookie: removeCookie,
  removeCookieWithUserIdIfExists: removeCookieWithUserIdIfExists
}
