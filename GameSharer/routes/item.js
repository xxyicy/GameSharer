var express = require('express');
var router = express.Router();
var itemUtils = require('../service/itemService')
var utils = require('../service/utils/utils')
var isLoggedIn = require('../policies/isLoggedIn')

router.post('/', isLoggedIn)

router.post('/', function(req, res) {
  var item = req.body;
  if (!req.userId) {
    return utils.respond(res, utils.fail("Please login first"))
  }
  item.owner = req.userId;
  var result = itemUtils.addItem(item);
  utils.respond(result);
})


module.exports = router;
