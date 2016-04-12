var mongoose = require("mongoose");
//mongoose.connect("mongodb://localhost/project_1");
mongoose.connect( process.env.MONGOLAB_URI ||
                       process.env.MONGOHQ_URL ||
                       "mongodb://localhost/project_1" );

module.exports.Entry = require('./entry');
//module.exports.Comment = require('./comment')
