var express = require('express');
var router = express.Router();
var itemService = require('../service/itemService')
var utils = require('../service/utils/utils')
var isLoggedIn = require('../policies/isLoggedIn')

router.post('/', isLoggedIn)
router.use('/my-items', isLoggedIn)

router.post('/', function(req, res) {
  var item = req.body;
  item.owner = req.userId;
  itemService.addItem(item, function(result) {
    utils.respond(res, result);
  });

})

router.get('/', function(req, res) {
  if (req.query.category){
    var item = {
      category: req.query.category
    }
    if (req.query.category === "game" || req.query.category === "console") {
      if (req.query.num){
        itemService.getItem(item, function(content){
          if (content.succ){
            content.result = content.result.slice(0, req.body.num)
          }
          return utils.respond(res, content);
        })
      }else{
        itemService.getItem(item, function(content){
          return utils.respond(res, content);
        })
      }
    }else{
      utils.respond(res, utils.fail("Gived wrong category"));
    }
  }
})

router.get('/my-items', function(req, res) {
  var item = {
    owner: req.userId
  }
  itemService.getItem(item, function(result){
    return utils.respond(res, result);
  })
})


module.exports = router;
