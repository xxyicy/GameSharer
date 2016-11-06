var express = require('express');
var router = express.Router();
var itemService = require('../service/itemService')
var utils = require('../service/utils/utils')
var isLoggedIn = require('../policies/isLoggedIn')

router.post('/', isLoggedIn)

router.post('/', function(req, res) {
  var item = req.body;
  if (!req.userId) {
    return utils.respond(res, utils.fail("Please login first"))
  }
  item.owner = req.userId;
  var result = itemService.addItem(item);
  utils.respond(result);
})

router.get('/', function(req, res) {
  console.log(req.query.category);
  if (req.query.category){
    if (req.query.category === "game" || req.query.category === "console") {
      if (req.query.num){
        itemService.getItemInCategoryWithNum(req.query.category, req.query.num, function(result){
          console.log(result)
          return utils.respond(res, result);
        })
      }else{
        var result = itemService.getItemInCategory(req.query.category, function(result){
          return utils.respond(res, result);
        })
      }
    }else{
      utils.respond(res, utils.fail("Gived wrong category"));
    }
  }
})


module.exports = router;
