var express = require("express");

var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOHQ_URL);

var logSchema = new mongoose.Schema({
    code: String,
    responseTime: Number,
    endpoint: String
});

var Log = mongoose.model('log', logSchema);

app.use(function(req, res, next){
    var start = Date.now();
    res.on("finish", function(){
        var duration = Date.now - start;
        var log = new Log ( { responseTime: duration, endpoint: req.originalUrl});
        log.save();
    var requestLogger = function(req){
        Object.keys(req);
        console.log(requestLogger());
    }
    });
    next();
});



//requestLogger needs to log keys of middleware

var restaurantSchema = new mongoose.Schema({
    code: String,
    name: String,
    menuList: [{}]
});



var Restaurant = mongoose.model('Restaurant', restaurantSchema);



router.post("/restaurants", function(req, res) {
    var restaurant = new Restaurant({
        code: (new Date()).getTime().toString(),
        name: req.body.name,
        menuList: req.body.menuList,
        restaurant: req.body.restaurant
    });

    restaurant.save(function(err, postedRestaurant) {
        res.json(postedRestaurant);
    });
});

router.get("/restaurants", function(req, res) {
    Restaurant.find({}).exec(function(err, result) {
        res.json(result);
    });
});

router.delete("/restaurants/:restaurantCode", function(req, res) {
    Restaurant.findOne({ code: req.params.restaurantCode }).remove().exec(function(err) {
        if (err) {
            res.json(500, { error: 'we suck' });
        }
        res.json({ message: 'document delete' });
    });
});

router.put('/restaurants/:restaurantCode', function(req, res) {
    Restaurant.findOne({ code: req.params.restaurantCode }, function(err, restaurant) {
        if (err) {
            console.log('Error on lookup!', err);
            return res.json(500, { error: 'could not process request'});
        }
        if (restaurant) {
            if (req.body.name) {
                restaurant.name = req.body.name;
            }
            if (req.body.restaurant) {
                restaurant.restaurant = req.body.restaurant
            }
            restaurant.save(function (err, question) {
                if (err) {
                    console.log('Error on save!', err);
                    return res.json(500, { error: 'could not process request'});
                }
                res.json(restaurant);
            });
        } else {
            res.json(404, { error: 'not found' });
        }
    });
});

router.get("/restaurants/:restaurantCode", function(req, res) {
    Restaurant.findOne({ code: req.params.restaurantCode }).exec(function(err, restaurant) {
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.json(404, { error: 'no question found for that id' } );
        }
    });
});


//router.get("/avatar/:email", function(req, res){
//    var md5email = myLib.md5(req.params.email);
//    res.redirect("http://www.gravatar.com/avatar/" + md5email);
//});

//comment

module.exports = router;
