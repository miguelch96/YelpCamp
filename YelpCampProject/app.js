var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
var seedDB = require("./seed");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");

var app = express();

var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");



mongoose.Promise = global.Promise;

mongoose.connect("mongodb://mongo:27017/yelpcampDB",{
    useMongoClient: true
});


// view engine setup
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
//seedDB();

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "The secret is learn many thing",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);


app.listen("80",function () {
    console.log("YelpCamp Started");
});

module.exports = app;
