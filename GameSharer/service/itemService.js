var mongoose = require("mongoose")
var itemValidator = require("./validations/itemValidator")
var utils = require("./utils/utils")

function addItem(item, next) {
  //TODO hardcoded picUrl
  item.picUrl = "/";
  var validation = itemValidator.validateItem(item);
  if (!validation.succ) {
    return next(validation);
  } else {
    item.status = "active";
    mongoose.model('Item').create(item,
    function(err, item){
       if (err) {
          return next(utils.fail(err.code));
       } else {
          return next(utils.succ(item));
       }
    })
  }
}

function deleteItem(item, next) {
  mongoose.model('Item').remove({ "_id":item.id, "owner": item.owner}, function(err) {
    if (err) {
      return next(utils.fail(err.code));
    } else {
      return next(utils.fail("item deleted"));
    }
  })
}

function getItem(item, next) {
  mongoose.model('Item').find(item, function(err, items){
    if (err){
      next(utils.fail(err.code))
    }
    next(utils.succ(items))
  })
}

module.exports = {
  addItem: addItem,
  getItem: getItem,
  deleteItem: deleteItem,
}

