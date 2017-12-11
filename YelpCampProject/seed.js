var mongoose = require("mongoose")
var Campground = require("./models/campground")

var data = [
    {
        name: "Cloud's Rest",
        image: "https://i.ytimg.com/vi/N5qLVlSzaQ0/maxresdefault.jpg",
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "http://www.whitethaiger.net/gallery3/var/albums/Eastern-Sierra-Nevada---August-2011/Cloud%27s-Rest/IMG_0279-1.jpg?m=1313371728",
        description: "blah blah blah"
    },
    {
        name: "Jungle Loreto",
        image: "https://i.ytimg.com/vi/bv7ogWz7zGQ/maxresdefault.jpg",
        description: "blah blah blah"
    }
];

function seedDB() {
    Campground.remove({},function (err) {
        if(err)
            console.log(err)
        else{
            console.log("removed campgrounds!")
            data.forEach(function (seed) {
                Campground.create(seed,function (err,data) {
                    if(err)
                        console.log(err)
                    else{
                        console.log("Added a campground")
                    }
                })
            })
        }
    })
}

module.exports = seedDB;

