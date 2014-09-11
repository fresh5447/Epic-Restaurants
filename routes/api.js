var express = require("express");
var router = express.Router();

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOHQ_URL);

router.get("/test", function(req,res){
    res.json({method: 'Get', serverTime: new Date()});
});

router.post("/test", function(req,res){
var output = req.body;
output['method'] = 'POST';
output['serverTime'] = new Date();
res.json(output);
});

///POST TO QUESTIONS
router.post("/questions", function(req,res) {
    var question = new Question({
        email: request.body.email,
        question: request.body.question,
        code: (new Date()).getTime().toString()
    });
    question.save(function (err, postedQuestion) {
        res.json(postedQuestion);
    });
});


///GET ALL QUESTIONS
router.get("/questions", function(req,res) {
        Question.find({}).exec(function(err, result){
            if (question) {
                res.json(result);
            } else {
                res.json(404, {error: 'no question found for that id'});
            }
        });

    });


///GET QUESTION BY CODE
router.get("/questions/:questionCode", function(req,res) {
    Question.findOne({ code: req.params.questionCode}).exec(function(err, question){
        if (question) {
            res.json(question);
        } else {
            res.json(404, {error: 'no question found for that id'});
        }
    });
});


/// POST TO RESTAURANT
router.post("/restaurants", function(req,res) {
    var restaurant = new Restaurant({
        name: request.body.name,
        menu: request.body.menu,
        code: (new Date()).getTime().toString()
    });
    restaurant.save(function (err, postedRestaurant) {
        res.json(postedRestaurant);
    });
});



/// GET ALL RESTAURANTS
router.get("/restaurants", function(req,res) {
    Restaurant.find({}).exec(function(err, result){
        if (question) {
            res.json(result);
        } else {
            res.json(404, {error: 'no question found for that id'});
        }
    });
});


/// GET RESTAURANT BY ID
router.get("/restaurants/:restaurantCode", function(req,res) {
    Question.findOne({ code: req.params.restaurantCode}).exec(function(err, restaurant){
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.json(404, {error: 'no question found for that id'});
        }
    });
});

///CREATE QUESTION SCHEMA
var questionSchema = new mongoose.Schema({
        email: String,
        question: String,
        code: String
});

var Question = mongoose.model('Question', questionSchema);
var questionOne = new Question({
    email: 'fourth@ch.com',
    question: 'first question'
});

questionOne.save();



/// CREATE RESTAURANT SCHEMA
var restaurantSchema = mongoose.Schema({
    name: String,
    menu: Array,
    code: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);
var restaurantOne = new Restaurant({
    name: 'Bert & Ernies',
    menu: ["burger", "fries", "pop"],
    code: (new Date()).getTime().toString()
});

restaurantOne.save();





module.exports = router;

