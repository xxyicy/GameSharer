var mongoose = require('mongoose');
var utils = require('../service/utils/utils')
var cookieService = require('../service/cookieService')

var isLoggedIn = function (req, res, next) {
  console.log("isLoggedIn")
  if (req.cookies.uid) {
    mongoose.model('Cookie').find({
      cookie: req.cookies.uid
    }, function (err, cookies) {
      if (err) {
        utils.respond(res, utils.fail(err))
        return;
      }
      //if there's no corresponding or more than 1 cookie in the db
      if (cookies.length !== 1) {
        //TODO fix it on frontend
        res.clearCookie('uid')
        return utils.respond(res, utils.fail("fatal error: not exactly one cookie found"))
      }
      var cookie = cookies[0];
      var expire = cookie.expire;
      //if cookie has expired
      if (expire < Date.now()) {
        if (!cookieService.removeCookie(req.cookies.uid, res)) {
          return utils.respond(res, utils.fail("fatal server error while removing cookie"))
        } else {
          return utils.respond(res, utils.fail("cookie expired"))
        }
      } else {
        //TODO update cookie expiration with data imported from config file
        cookie.expire = Date.now() + 1000 * 3600 * 24 * 7;
        cookie.save();
        req.userId = cookie.uid;
        next()
      }
    });
    //If the request does not contain user cookie
  } else {
    //TODO
    alert("Please Login.")
    res.render('index');
  }
};

module.exports = isLoggedIn;
