var mongoose = require("mongoose")
var itemValidator = require("./validations/itemValidator")
var utils = require("./utils/utils")

function addItem(item) {
  var validation = itemValidator.validateItem(item);
  if (!validation.succ) {
    return validation;
  } else {
    item.status = "active";
    mongoose.model('Item').create(item,
    function(err, item){
       if (err) {
          return utils.fail(err);
       } else {
          return utils.succ(item);
       }
    })
  }
}

function deleteItem(itemId, userId) {
  mongoose.model('Item').remove({ "_id":itemId, "owner": userId}, function(err) {
    if (err) {
      return utils.fail(err);
    } else {
      return utils.fail("item deleted")
    }
  })
}

function getItemInCategoryWithNum(itemCategory, itemNum, next) {
  mongoose.model('Item').find({
    category: itemCategory
  }, function(err, items){
    if (err){
      next(utils.fail(err.code))
    }
    console.log(items)
    next(utils.succ(items.slice(0, itemNum)))
  })
}

function getItemInCategory(itemCategory, next) {
  mongoose.model('Item').find({
    category: itemCategory
  }, function(err, items){
    if (err){
      next(utils.fail(err.code))
    }
    next(utils.succ(items))
  })
}

module.exports = {
  addItem: addItem,
  getItemInCategoryWithNum: getItemInCategoryWithNum,
  getItemInCategory: getItemInCategory
}

