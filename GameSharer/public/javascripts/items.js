var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), // mongodb connection
    bodyParser = require('body-parser'), // parse info from POST
    methodOverride = require('method-override');  // used to manipulate POST data

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body == 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));



module.exports = router;
