var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/yelpcampDB",{
    useMongoClient: true
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground",campgroundSchema)


app.get("/",function (req, res) {
    res.render("landing");
});

//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds",function (req, res) {

    //Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds",{campgrounds: campgrounds});
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new",function (req,res) {
    //TODO:
    res.render("newcampground");
});

//CREATE -ADD NEW CAMPGROUND TO DB
app.post("/campgrounds",function (req,res) {
    //TODO:
    var name = req.body.campgroundName;
    var image = req.body.campgroundImage;

    Campground.create({
            name: name,
            image: image
        }, function (err,campground) {
            if(err){
                console.log(err)
            } else {
                console.log("NEWLY CREATED CAMPGROUND");
                console.log(campground);
                res.redirect("/campgrounds");
            }
        }
    );
});

//For invalid routes
app.get("*",function (req,res) {
    res.send("Invalid Route");
});

app.listen("8080","localhost",function () {
    console.log("YelpCamp Started");
});

module.exports = app;
