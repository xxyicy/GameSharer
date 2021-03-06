var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var passwordHash = require('password-hash');
var userService = require('../service/userService')
var userValidator = require('../service/validations/userValidator')
var cookieService = require('../service/cookieService')
var isLoggedIn = require('../policies/isLoggedIn')
var utils = require('../service/utils/utils')
var uuid = require('uuid')
var multer = require('multer')
var path = require('path')

var uploading = multer({
  dest: path.resolve(__dirname, "../public/img/")
})

router.use('/logout', isLoggedIn);
router.use('/profile', isLoggedIn);

router.get('/profile', function (req, res) {
  var uid = req.userId;
  userService.getUser(uid, function(result) {
    utils.respond(res, result);
  })
})

router.post('/profile', uploading.single('avatar'), function (req, res) {
  var uid = req.userId;
  var data = {
    uid: uid,
    info: req.body
  };
  if (req.file) {
    data.info.avatarUrl = req.file.filename;
  }
  userService.updateUser(data, function(result) {
    utils.respond(res, result)
  })
})

router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  if (!userId) {
    //TODO error handling
    return;
  }
  //TODO do not use objectId
  mongoose.model("User").find({"ObjectId" : userId}, function (err, user) {
    if (err) {
      //TODO error handling
      return console.log(err);
    }
    var result = {
      email: user.email,
      name: user.name,
      contactInfo: user.contatInfo,
      avatarUrl: user.avatarUrl
    };
    res.format({
      json: function() {
        res.json(result);
      }
    })
  })
})

router.post('/signup', function (req, res) {
  var user = req.body;
  userService.createUser(user, function(result) {
     utils.respond(res, result);
  });
});

router.post('/login', function (req, res, next) {
  var user = req.body;
  var result = userValidator.validateLogin(user);
  if (!result.succ) {
    return utils.respond(res,result);
  }
  var username = req.body.username;
  var password = req.body.password;

  mongoose.model('User').find({
    username: username
  }, function (err, users) {
    if (err) {
      console.log("error reading users")
      return utils.respond(res, utils.fail(err.code))
    }
    if (users.length==0){
      return utils.respond(res, utils.fail("user not found"))
    }
    var user = users[0]
    if (!passwordHash.verify(password, user.password)) {
      return utils.respond(res, utils.fail("password incorrect"));
    }
    cookieService.removeCookieWithUserIdIfExists(user._id)
    console.log(user._id)
    var co = uuid.v1()
    console.log(co)
    mongoose.model('Cookie').create({
      uid: user._id,
      cookie: co,
      expire: 1000 * 3600 * 24 * 7 + Date.now()
    }, function (err, cookie) {
      if (err) {
        console.log("error creating cookie")
        return utils.respond(res, utils.fail(err.code));
      } else {
        res.cookie("uid", cookie.cookie);
        return utils.respond(res, utils.succ(cookie));
      }
    })
  });
});


router.delete('/logout', function (req, res) {
  mongoose.model('Cookie').remove({
    cookie: req.cookies.uid
  }, function (err, cookie) {
    if (err) {
      return utils.respond(res, utils.fail(err.code));
    } else {
      res.clearCookie("uid");
      return utils.respond(res, utils.succ("Cookie Cleared"));
    }
  });
});

module.exports = router;
