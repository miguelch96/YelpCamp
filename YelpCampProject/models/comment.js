var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    text: String,
    author: String
},{usePushEach: true});

module.exports = mongoose.model("Comment",campgroundSchema)
