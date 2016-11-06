var express = require('express');
var router = express.Router();
var rand = require("generate-key");
var mongoose = require('mongoose')
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/profile', function (req, res, next) {
  res.render('profile');
});

router.get('/dialog', function (req, res, next) {
  res.render('post-dialog');
});

router.post('/signup', function (req, res, next) {
  mongoose.model('User').create({
    username: req.body.username,
    email: req.body.email,
    password: passwordHash.generate(req.body.password),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber
  }, function (err, user) {
    if (err) {
      res.send(err);
    } else {
      res.format({
        json: function () {
          res.json({ boolean: true, date: user });
        }
      });
    }
  });
});

router.post('/login', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  mongoose.model('User').find({
    username: username
  }, function (err, user) {
    if (err) {
      res.format({
        json: function () {
          res.json({ boolean: false, message: "error." });
        }
      });
    }
    if (user.length == 0) {
      res.format({
        json: function () {
          res.json({ boolean: false, message: "User not found." });
        }
      });
    }
    else if (!passwordHash.verify(req.body.password, user[0].password)) {
      res.format({
        json: function () {
          res.json({ boolean: false, message: "Password is not correct." });
        }
      });
    }
    else {
      var userInfo = user[0];
      mongoose.model('Cookie').find({ uid: userInfo._id }, function (err, cookies) {
        if (err) {
          res.send(err);
        }
        if (cookies.length != 0) {
          cookie = cookies[0];
          cookie.cookie = rand.generateKey();
          cookie.expire = 360000 + Date.now();
          cookie.save();
          res.cookie("uid", cookie.cookie);
          res.format({
            json: function () {
              res.json({ boolean: true, date: cookie });
            }
          });
        } else {
          mongoose.model('Cookie').create({
            uid: userInfo._id,
            cookie: rand.generateKey(),
            expire: 360000 + Date.now()
          }, function (err, cookie) {
            if (err) {
              res.send(err);
            } else {
              res.cookie("uid", cookie.cookie);
              res.format({
                json: function () {
                  res.json({ boolean: true, date: user });
                }
              });
            }
          })
        }

      })
    }
  });
});

module.exports = router;
