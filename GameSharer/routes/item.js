var express = require('express');
var router = express.Router();
var itemService = require('../service/itemService')
var utils = require('../service/utils/utils')
var isLoggedIn = require('../policies/isLoggedIn')
var multer = require('multer')
var path = require('path')

var upload = multer({
  dest: path.join(__dirname, "../public/img/")
})

router.post('/', isLoggedIn)

router.post('/', upload.single('itemPic'), function(req, res) {
  var item = req.body;
  console.log(req.body)
  console.log(req.file)
  if (req.file) {
    item.picUrl = req.file.filename
  }
  item.owner = req.userId;
  itemService.addItem(item, function(result) {
    utils.respond(res, result);
  });

})

router.get('/', function(req, res) {
  console.log(req.query.category);
  if (req.query.category){
    if (req.query.category === "game" || req.query.category === "console") {
      if (req.query.num) {
        itemService.getItemInCategoryWithNum(req.query.category, req.query.num, function(result){
          console.log(result)
          return utils.respond(res, result);
        })
      } else {
        var result = itemService.getItemInCategory(req.query.category, function(result){
          return utils.respond(res, result);
        })
      }
    } else {
      utils.respond(res, utils.fail("Gived wrong category"));
    }
  }
})


module.exports = router;
