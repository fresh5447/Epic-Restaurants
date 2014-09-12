var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Epic Restaurants', description:'At least in my opinion.'});

});

router.get('/stuff', function(req, res) {
    res.render('index', { title: 'Expressos', description:'Mocha late something JavaChocScript Framework'});
});

router.get('/app', function(req, res) {
    res.render('index', { title: 'Epic Restaurants', description:'At least in my opinion.'});
});





module.exports = router;


