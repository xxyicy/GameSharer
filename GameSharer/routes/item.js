var express = require('express');
var router = express.Router();
var itemUtils = require('../service/itemService')
var utils = require('../service/utils/utils')
var isLoggedIn = require('../policies/isLoggedIn')

router.post('/', isLoggedIn)

router.post('/', function(req, res) {
  var item = req.body;
  item.owner = req.userId;
  itemUtils.addItem(item, function(result) {
    utils.respond(res, result);
  });
})


module.exports = router;
