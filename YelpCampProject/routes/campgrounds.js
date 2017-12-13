var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/",function (req, res) {
    Campground.find({}, function (err, campgrounds) {
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds: campgrounds});
        }
    });
});

//NEW - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new",isLoggedIn,function (req,res) {
    //TODO:
    res.render("campgrounds/new");
});

//CREATE -ADD NEW CAMPGROUND TO DB
router.post("/",isLoggedIn,function (req,res) {

    var author = {
        id: req.user._id,
        username: req.user.username
    };

    req.body.campground.author=author;
    Campground.create(req.body.campground, function (err,newCampground) {
            if(err){
                console.log(err)
            } else {
                res.redirect("/campgrounds");
            }
        }
    );
});

//SHOW - SHOW CAMPGROUND INFO
router.get("/:id",function (req,res) {
    //find the campground wwith provided ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        } else {
            res.render("campgrounds/show",{campground: foundCampground});
        }
    });
});





//EDIT CAMPGROUND ROUTE
router.get("/:id/edit",checkCampgroundOwnership,function (req,res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit",{campground: foundCampground});
    });
});

//UPDATE CAMPGROUND ROUTE

router.put("/:id",checkCampgroundOwnership,function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    });
});

//DELETE CAMPGROUND ROUTE

router.delete("/:id",checkCampgroundOwnership,function (req, res) {
    Campground.findByIdAndRemove(req.params.id,function (err) {
        if(err)
            res.redirect("/campgrounds"+req.params.id);
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

function checkCampgroundOwnership(req,res,next) {
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function (err, foundCampground) {
            if(err)
                res.redirect("back");
            else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    res.redirect("back")
                }
            }
        });
    }else{
        res.redirect("back")
    }
}

module.exports = router;
