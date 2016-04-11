var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Comment = require('./comment');

var entrySchema = new Schema ({
   title: String,
   date: String,
   text: String
   //comments: [Comment.schema]

});

var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
