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

router.get('/my-post', function(req, res, next) {
  res.render('items')
})

router.get('/items-page', function(req, res, next) {
  res.render('items');
})

router.get('/detail', function(req, res, next) {
  res.render('itemDetail');
})

module.exports = router;
