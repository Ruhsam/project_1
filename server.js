//Server side JS
//Requiring express because node is legit!
var express = require('express');
//making express required and run on app variable
var app = express();
var bodyParser=require('body-parser');
var PORT=process.env.PORT || 3000;
//requiring model folder
var db = require('./models');
// serve static files from public folder
app.use(express.static(__dirname + '/public'));
//body parser requirement
app.use(bodyParser.urlencoded({ extended: true }));


//////Routes///////


/*
 * HTML Endpoints
 */

app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/view/index.html');
});

//json endpoints
app.get('/api/entry', function (req, res) {
  db.Entry.find(function(err, entry){
    if (err) { return console.log("index error: " + err); }
    res.json(entry);
  });
});


///////////////Posting to DB route//////////////////
app.post('/api/entry', function (req, res) {
   var newEntry = new db.Entry({
      title: req.body.title,
      date: req.body.date,
      text: req.body.text,
   });
   newEntry.save(function(err, saved) {
      console.log('test test', req.body);
      res.json(saved);
   });
});


   app.delete('/api/entry/:id', function (req, res) {
     // get entry id from url params (`req.params`)
     console.log('entry delete', req.params);
     var entryId = req.params.id;
//      // find the index of the entry we want to remove
     db.Entry.findOneAndRemove({ _id: entryId }, function (err, deletedEntry) {
       res.json(deleteEntry);
//      });
   });
//
});

// listen on port 3000
app.listen(PORT, function () {
  console.log('Express server is running on http://localhost:3000/');
});
