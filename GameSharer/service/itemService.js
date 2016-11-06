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

module.exports = {
  addItem: addItem
}

