var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var passwordHash = require('password-hash');

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
}

router.use(function (req, res, next) {
  if (req.cookies.uid) {
    mongoose.model('Cookie').find({
      cookie: req.cookies.uid
    }, function (err, cookies) {
      if (err) {
        //TODO
        return console.log(err);
      }
      //if there's no corresponding or more than 1 cookie in the db
      if (cookies.length !== 0) {
        //TODO
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
                res.json({ message: "Cookie Expired!" });
              }
            });
          })
      } else {
        //TODO update cookie expiration with data imported from config file
        cookie.expire = Date.now() + 0;
        cookie.save();
        req.userId = cookie.uid;
        next()
      }
    });
  //If the request does not contain user cookie
  } else {
    //TODO
  }
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
          res.json(user);
        }
      });
    }
  });
});

router.post('/login', function (req, res, next) {
  var username = req.body.username;

  password = req.body.password;
  mongoose.model('User').find({
    username: username
  }, function (err, user) {
    if (err) {
      console.log(err);
    }
    if (user.length==0){
      res.status(233);
      res.format({
        json: function () {
          res.json({err:  "User not found." });
        }
      });
    } 
    else if (!passwordHash.verify(password, user[0].password)) {
      res.status(234);
      res.format({
        json: function () {
          res.json({ err:  "Password is not correct." });
        }
      });
    }
    else {
      userInfo = user[0];
      mongoose.model('Cookie').create({
        uid: userInfo._id,
        cookie: passwordHash.generate(userInfo.username),
        expire: 360000 + Date.now()
      }, function (err, cookie) {
        if (err) {
          res.send(err);
        } else {
          res.cookie("uid", cookie.cookie);
          res.format({
            json: function () {
              res.json({ message: "Cookie Set!" });
            }
          });
        }
      })
    }
  });
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
