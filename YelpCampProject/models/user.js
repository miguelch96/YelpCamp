var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose")


var userSchema = new mongoose.Schema({
    username: String,
    password: String
},{usePushEach: true});

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema)
