// entryController
var db = require('../models');

// app.get('/api/entry/:entryId/comment', controllers.entrySongs.index);
function index(req, res) {
  db.Comment.findById(req.params.entryId, function(err, foundEntry) {
    console.log('responding with comments:', foundEntry.Comment);
    res.json(foundEntry.Comment);
  });
}

// // POST '/api/entry/:entryId/songs'
// function create(req, res) {
//   db.Entry.findById(req.params.entryId, function(err, foundEntry) {
//     console.log(req.body);
//     var newComment = new db.Comment(req.body);  // dangerous, in a real app we'd validate the incoming data
//     foundEntry.comment.push(newEntry);
//     foundEntry.save(function(err, savedEntry) {
//       console.log('newComment created: ', newComment);
//       res.json(newComment);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
//     });
//   });
// }

// // app.delete('/api/entry/:albumId/songs/:songId', controllers.entrySongs.destroy);
// function destroy(req, res) {
//   db.Entry.findById(req.params.albumId, function(err, foundEntry) {
//     console.log(foundEntry);
//     // we've got the album, now find the song within it
//     var correctComment = foundEntry.comment.id(req.params.commentId);
//     if (correctComment) {
//       correctComment.remove();
//       // resave the album now that the song is gone
//       foundEntry.save(function(err, saved) {
//         console.log('REMOVED ', correctComment.name, 'FROM ', saved.comment);
//         res.json(correctComment);
//       });
//     } else {
//       res.send(404);
//     }
//   });
//
// }
//
// //app.put('/api/entry/:albumId/songs/:songId', controllers.entrySongs.update);
// function update(req, res) {
//   db.Entry.findById(req.params.albumId, function(err, foundAlbum) {
//     console.log(foundAlbum);
//     // we've got the album, now find the song within it
//     var correctSong = foundAlbum.songs.id(req.params.songId);
//     if (correctSong) {
//       console.log(req.body);
//       correctSong.trackNumber = req.body.trackNumber;
//       correctSong.name = req.body.name;
//       foundAlbum.save(function(err, saved) {
//         console.log('UPDATED', correctSong, 'IN ', saved.songs);
//         res.json(correctSong);
//       });
//     } else {
//       res.send(404);
//     }
//   });
//
// }


module.exports = {
  index: index,
  //create: create,
  // update: update,
  // destroy: destroy
};
