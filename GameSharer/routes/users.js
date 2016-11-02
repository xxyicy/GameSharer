var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

/* GET users listing. */
router.get('/:userId', function(req, res, next) {
  var userId = req.params.userId;
  if (!userId) {
    //TODO error handling
    return;
  }
  mongoose.model("User").find({"_id" : userId}, function (err, user) {
    if (err) {
      //TODO error handling
      return console.log(err);
    }
    var result = {
      email: user.email,
      name: user.name,
      contactInfo: user.contatInfo,
      avatarUrl: user.avatarUrl
    };
    res.format({
      json: function() {
        res.json(result);
      }
    })
  })
});

module.exports = router;
