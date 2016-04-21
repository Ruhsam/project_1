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

///////////////Posting Comment to DB route//////////////////
app.post('/api/comment', function (req, res) {
   console.log(req.body);
   res.status(200);
   var newComment = new db.Comment({
      name: req.body.name,
      date: req.body.date,
      text: req.body.text,
   });
   newComment.save(function(err, saved) {
      console.log('test comment test', req.body);
      res.json(saved);
   });
});

///////////////Removing from DB route//////////////////

app.delete('/api/entry/:id', function (req, res) {
   // get entry id from url params (`req.params`)
   //console.log('entry delete', req.params);
   var entryId = req.params.id;
   //console.log(entryId);
   // find the index of the entry we want to remove
   db.Entry.findOneAndRemove({ _id: entryId }, function (err, deletedEntry) {
      res.json(deletedEntry);
   });
});

///////////////Editing route////////////////
app.put('/api/entry/:id',function (req, res) {
   console.log("Save Button Pressed");
   db.Entry.findById(req.params.id, function(err, foundEntry) {
      if(err) {
         //console.log('db entry update error', err);
         console.log('not editing');
         res.sendStatus(404);
      } else {
         console.log(req.body);
         foundEntry.title = req.body.title;
         foundEntry.date = req.body.date;
         foundEntry.text = req.body.text;
         foundEntry.save(function(err, savedEntry) {
            if(err) {
               console.log('saving altered entry failed');
               res.sendStatus(500);
            }
            console.log('final entry');
            res.sendStatus(200);
         });
      }
   });

});
//
//});

// listen on port 3000
app.listen(PORT, function () {
   console.log('Express server is running on http://localhost:3000/');
});
