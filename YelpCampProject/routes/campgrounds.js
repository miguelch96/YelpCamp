var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/campgrounds",function (req, res) {
    console.log(req.user);
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/campgrounds/new",function (req,res) {
    //TODO:
    res.render("campgrounds/new");
});

//CREATE -ADD NEW CAMPGROUND TO DB
router.post("/campgrounds",function (req,res) {
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
router.get("/campgrounds/:id",function (req,res) {
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

router.get("/campgrounds/:id/edit",function (req,res) {
    Campground.findById(req.params.id,function (err, foundCampground) {
        if(err)
            res.redirect("/campgrounds")
        else{
            res.render("edit",{campground: foundCampground})
        }
    });
});

router.put("/campgrounds/:id", function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

router.delete("/campgrounds/:id",function (req, res) {
    Campground.findByIdAndRemove(req.params.id,function (err, res) {
        if(err)
            res.redirect("/campgrounds/"+req.params.id)
        else{
            res.redirect("/campgrounds")
        }
    });
});

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
