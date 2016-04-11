var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema ({
   name: String,
   date: String,
   text: String

});


var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
