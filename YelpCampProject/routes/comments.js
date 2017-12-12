//  =========================
//      COMMENT ROUTES
//  =========================

app.get("/campgrounds/:id/comments/new",isLoggedIn,function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if(err)
            console.log(err)
        else
            res.render("comments/new",{campground: foundCampground})
    });
});

app.post("/campgrounds/:id/comments",isLoggedIn,function (req,res) {
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