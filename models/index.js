var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/project_1");

module.exports.Entry = require('./entry');
//module.exports.Comment = require('./comment');
