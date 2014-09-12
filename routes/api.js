var express = require("express");

var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOHQ_URL);

var restaurantSchema = new mongoose.Schema({
    code: String,
    name: String,
    menuList: {name: String, price: String}
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

module.exports = router;
