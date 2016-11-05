var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var passwordHash = require('password-hash');

router.get('/:userId', function (req, res, next) {
  var userId = req.params.userId;
  if (!userId) {
    //TODO error handling
    return;
  }
  //TODO do not use objectId
  mongoose.model("User").find({ "ObjectId": userId }, function (err, user) {
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
      json: function () {
        res.json(result);
      }
    })
  })
})

router.use(function (req, res, next) {
  if (req.cookies.uid) {
    mongoose.model('Cookie').find({
      cookie: req.cookies.uid
    }, function (err, cookies) {
      if (err) {
        //TODO
        console.log(err)
        res.format({
          json: function () {
            res.json({ boolean: false, message: "Your action is faild." });
          }
        });
        return;
      }
      //if there's no corresponding or more than 1 cookie in the db
      if (cookies.length !== 1) {
        //TODO
        res.format({
          json: function () {
            res.json({ boolean: false, message: "Your action is faild." });
          }
        });
        return;
      }
      var cookie = cookies[0];
      var expire = cookie.expire;
      //if cookie has expired
      if (expire < Date.now()) {
        mongoose.model('Cookie').remove({
          cookie: req.cookies.uid
          //TODO beneath
        }, function (err) {
          res.clearCookie("uid");
          res.format({
            json: function () {
              res.json({ boolean: false, message: "Cookie Expired!" });
            }
          });
        })
      } else {
        //TODO update cookie expiration with data imported from config file
        cookie.expire = Date.now() + 360000;
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
});

router.delete('/logout', function (req, res, next) {
  mongoose.model('Cookie').remove({
    cookie: req.cookies.uid
  }, function (err, cookie) {
    if (err) {
      res.format({
        json: function () {
          res.json(err);
        }
      });
    } else {
      res.clearCookie("uid");
      res.format({
        json: function () {
          res.json({ message: "Cookie Clear!" });
        }
      });
    }
  });
});

module.exports = router;
