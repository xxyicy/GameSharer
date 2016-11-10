var express = require('express');
var router = express.Router();
var itemService = require('../service/itemService')
var userService = require('../service/userService')
var utils = require('../service/utils/utils')
var isLoggedIn = require('../policies/isLoggedIn')
var multer = require('multer')
var path = require('path')

var upload = multer({
  dest: path.resolve(__dirname, "../public/img/")
})

router.post('/', isLoggedIn)
router.use('/my-items', isLoggedIn)
router.use('/detail', isLoggedIn)
router.use('/update', isLoggedIn)
router.use('/delete', isLoggedIn)

router.post('/', upload.single('itemPic'), function (req, res) {
  var item = req.body;
  if (req.file) {
    item.picUrl = req.file.filename
  }
  item.owner = req.userId;
  itemService.addItem(item, function (result) {
    utils.respond(res, result);
  });

})

router.get('/', function (req, res) {
  if (req.query.category) {
    var item = {
      category: req.query.category
    }
    if (req.query.category === "game" || req.query.category === "console") {
      if (req.query.num) {
        itemService.getItem(item, function (content) {
          if (content.succ) {
            content.result = content.result.slice(0, req.body.num)
          }
          return utils.respond(res, content);
        })
      } else {
        itemService.getItem(item, function (content) {
          return utils.respond(res, content);
        })
      }
    } else {
      utils.respond(res, utils.fail("Gived wrong category"));
    }
  }
})

router.get('/my-items', function (req, res) {
  var item = {
    owner: req.userId
  }
  itemService.getItem(item, function (result) {
    return utils.respond(res, result);
  })
})

router.get('/detail', function (req, res) {
  var itemId = req.query.itemId;
  var id = { _id: itemId };
  console.log(id);
  itemService.getItem(id, function (items) {
    if (!items.succ) {
      utils.respond(res, items);
    }
    var item = items.result[0];
    console.log(item);
    userService.getUser(item.owner, function (users) {
      if (!users.succ) {
        utils.respond(res, users);
      }
      var user = users.result;
      console.log(users);
      var result = {
        _id: item._id,
        isBelongTo: req.userId == user._id,
        name: item.name,
        picUrl: item.picUrl,
        category: item.category,
        purpose: item.purpose,
        price: item.price,
        username: user.username,
        email: user.email,
        phone: user.phoneNumber,
        description: item.description
      }
      console.log(result);
      return utils.respond(res, utils.succ(result));
    })
  })
})


router.put('/update', function (req, res) {
  var data = {
    _id: req.body._id,
    name: req.body.name,
    price: req.body.price,
    purpose: req.body.purpose,
    category: req.body.category,
    description: req.body.description,
  };
  itemService.getItem({ _id: data._id }, function (items) {
    if (!items.succ) {
      utils.respond(res, items);
    }
    var item = items.result[0];
    item.name = data.name;
    item.price = data.price;
    item.purpose = data.purpose;
    item.category = data.category;
    item.description = data.description;
    item.save();
    return utils.respond(res, utils.succ(item));
  });
})

router.delete('/delete', function (req, res) {
  var data = {
    id: req.body._id,
    owner: req.userId
  }
  console.log(data);
  itemService.deleteItem(data, function (result) {
    console.log(result);
    if (!result.succ) {
      utils.respond(res, result);
    }
    return utils.respond(res, utils.succ("Item has been deleted successfully!"));
  });
})

module.exports = router;
