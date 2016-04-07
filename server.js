//Server side JS
//Requiring express because node is legit!
var express = require('express');
//making express required and run on app variable
var app = express();

//requiring model folder
var db = require('./models');













// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
