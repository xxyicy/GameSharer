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



module.exports = router;
