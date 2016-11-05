var express = require('express');
var router = express.Router();
var itemUtils = require('../service/itemService')

router.post('/', function(req, res) {
  var item = req.body;
  //TODO find userId in DB and set as item owner
  var result = itemUtils.addItem(item);
  if (result.succ) {
    //TODO response on success
  } else {
    //TODO response on failure
  }
})


module.exports = router;
