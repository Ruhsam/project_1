//Server side JS
//Requiring express because node is legit!
var express = require('express');
//making express required and run on app variable
var app = express();

//requiring model folder
var db = require('./models');

//body parser requirement
//var bodyParser = require('body-parser');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

//app.use(bodyParser.urlencoded({ extended: false }));

//////Routes///////


/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});






// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is running on http://localhost:3000/');
});
