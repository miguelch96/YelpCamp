var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//  =========================
//      COMMENT ROUTES
//  =========================

router.get("/new",isLoggedIn,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err)
            console.log(err)
        else
            res.render("comments/new",{campground: foundCampground})
    });
});

router.post("/",isLoggedIn,function (req,res) {
    Campground.findById(req.params.id,function (err, foundCampground) {
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }
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

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;