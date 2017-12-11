var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var Campground = require("./models/campground");
var User = require("./models/campground");
var Comment = require("./models/campground");
var seedDB = require("./seed");

seedDB();

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




app.get("/",function (req, res) {
    res.render("landing");
});

app.get("/campgrounds",function (req, res) {

    //Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("index",{campgrounds: campgrounds});
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new",function (req,res) {
    //TODO:
    res.render("new");
});

//CREATE -ADD NEW CAMPGROUND TO DB
app.post("/campgrounds",function (req,res) {
    //TODO:
    var name = req.body.campgroundName;
    var image = req.body.campgroundImage;
    var description = req.body.campgroundDescription;

    Campground.create({
            name: name,
            image: image,
            description: description
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

//SHOW - SHOW CAMPGROUND INFO
app.get("/campgrounds/:id",function (req,res) {
    //find the campground wwith provided ID
    Campground.findById(req.params.id, function (err, foundCampground){
        if(err){
            console.log(error);
        } else {
            //render show template with that campground
            res.render("show",{campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/edit",function (req,res) {
    res.render("edit")
});

app.put("/campgrounds/:id", function (req, res) {
    Campground.put()
})


app.delete("/campgrounds/:id",function (req, res) {
    Campground.findByIdAndRemove(req.params._id,function (err, res) {

    });
    res.redirect("/campgrounds")
});






//FOR INVALID ROUTES
app.get("*",function (req,res) {
    res.send("Invalid Route");
});

app.listen("8080","localhost",function () {
    console.log("YelpCamp Started");
});

module.exports = app;
