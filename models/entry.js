var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var entrySchema=new Schema ({
   title: String,
   date: Date,
   text: String,
   comments: []

});


var Entry = mongoose.model('Entry', entrySchema);
module.exports = Entry;
