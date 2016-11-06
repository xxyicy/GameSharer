var utils = require('../utils/utils')

function validateItem(item) {
  //TODO Put required fields into config file
  if (!item.name) {
    return utils.fail("missing title")
  }
  if (!item.description) {
    return utils.fail("missing description")
  }
  if (!item.purpose) {
    return utils.fail("missing purpose")
  }
  if (!item.price) {
    return utils.fail("missing price")
  }
  if (!item.category) {
    return utils.fail("missing category")
  }
  if (!item.picUrl) {
    return utils.fail("missing item picture")
  }
  if (!item.owner) {
    return utils.fail("missing owner")
  }
  return utils.succ("");
}

module.exports = {
  validateItem: validateItem
}
