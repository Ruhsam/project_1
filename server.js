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

//var controllers = require('./controllers');

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

app.post('/api/entry', function (req, res) {
  db.Entry.create(function(err, entry) {
     if (err) {
        console.log("we done messed up!", err);
     }
  console.log(req.body);
  res.json(req.body);
  });
});
//          //shows specific entry by id
//app.get('/api/entry/:entryId', controllers.Entry.show);
//          //post an entry
// app.post('/api/entry', function (req, res) {
// db.Entry.findById(req.params.entryId, function(err, foundEntry) {
//     console.log(req.body);
//     var newComment = new db.Comment(req.body);  // dangerous, in a real app we'd validate the incoming data
//     foundEntry.comment.push(newEntry);
//     foundEntry.save(function(err, savedEntry) {
//       console.log('newComment created: ', newComment);
//       res.json(newComment);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
//     });
// });
// });
//          //delete an entry
// app.delete('/api/entry/:entryId', controllers.Entry.destroy);
//
//          //shows a specific comment
//app.get('/api/entry/:entryId/comment', controllers.entryComments.index);
//          //posts a specific comment
// app.post('/api/entry/:entryId/comment', controllers.entryComments.create);
//          //deletes a specific comment
// app.delete('/api/entry/:entryId/comment/:commentId', controllers.entryComments.destroy);


// listen on port 3000
app.listen(PORT, function () {
  console.log('Express server is running on http://localhost:3000/');
});
