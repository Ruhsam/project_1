var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
   name: String,
   date: Date,
   text: String

});


var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
