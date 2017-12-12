var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var User = require("./models/user");
var Comment = require("./models/comment");
var seedDB = require("./seed");


mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/yelpcampDB",{
    useMongoClient: true
});


var app = express();

// view engine setup
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + 'public'));


seedDB();


app.get("/",function (req, res) {
    res.render("landing");
});

app.get("/campgrounds",function (req, res) {
    //Get all campgrounds from DB
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new",function (req,res) {
    //TODO:
    res.render("campgrounds/new");
});

//CREATE -ADD NEW CAMPGROUND TO DB
app.post("/campgrounds",function (req,res) {
    Campground.create(req.body.campground, function (err,newCampground) {
            if(err){
                console.log(err)
            } else {
                console.log("NEWLY CREATED CAMPGROUND");
                console.log(newCampground);
                res.redirect("/campgrounds");
            }
        }
    );
});

//SHOW - SHOW CAMPGROUND INFO
app.get("/campgrounds/:id",function (req,res) {
    //find the campground wwith provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            console.log(foundCampground);
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});

app.get("/campgrounds/:id/edit",function (req,res) {
    Campground.findById(req.params.id,function (err, foundCampground) {
        if(err)
            res.redirect("/campgrounds")
        else{
            res.render("edit",{campground: foundCampground})
        }
    });
});

app.put("/campgrounds/:id", function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

app.delete("/campgrounds/:id",function (req, res) {
    Campground.findByIdAndRemove(req.params.id,function (err, res) {
        if(err)
            res.redirect("/campgrounds/"+req.params.id)
        else{
            res.redirect("/campgrounds")
        }
    });
});

//  =========================
//      COMMENT ROUTES
//  =========================

app.get("/campgrounds/:id/comments/new",function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err)
            console.log(err)
        else
            res.render("comments/new",{campground: foundCampground})
    });
});

app.post("/campgrounds/:id/comments",function (req,res) {
    Campground.findById(req.params.id,function (err, foundCampground) {
        if(err)
            console.log(err);
        else{
            Comment.create(req.body.comment,function (err, newComment) {
                if(err)
                    console.log(err);
                else{
                    foundCampground.comments.push(newComment);
                    foundCampground.save();
                    console.log("NEWLY CREATED COMMENT");
                    res.redirect("/campgrounds/"+foundCampground._id)
                }
            })
        }
    })
});

//FOR INVALID ROUTES
app.get("*",function (req,res) {
    res.send("Invalid Route");
});

app.listen("8080","localhost",function () {
    console.log("YelpCamp Started");
});

module.exports = app;
