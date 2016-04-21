var db = require('./models');

var entryList=[];

entryList.push({
   title: 'Beans',
   date: '2000/11/02',
   text: 'Beans, beans, the musical fruit. The more you eat, the more you toot. The more you toot, the better you feel. So eat your beans at every meal!',
});

entryList.push({
   title: 'Here is to..',
   date: '2000/11/02',
   text: 'Here is to a long life and a merry one. A quick death and an easy one. A pretty girl and an honest one. A cold pint-- and another one!',

});
entryList.push({
   title: 'Ode to Travis',
   date: '2013/07/03',
   text: 'Roses are Red Violets are Violet...not blue, because here in WDI27 we are technical as fuck',

});
entryList.push({
   title: 'Enjoy the simple things',
   date: '2007/03/12',
   text: 'Just watched the bro in front of me, eat shit in front of the girl he was trying to impress. #TheWorldisJust',

});
entryList.push({
   title: 'Deep Thoughts',
   date: '2010/04/02',
   text: 'Ever wonder what soap is made of?',

});

var commentList = [];

commentList.push({
   name: 'Buttface one',
   date: '2001/12/03',
   text: 'well done sir, you have captured our hearts yet again!'

});

commentList.push({
   name: 'Angry Frenchman',
   date: '2002/10/05',
   text: 'A modern day Bill Shakespeare'

});

commentList.push({
   name: 'Sailor McKracken',
   date: '2001/01/05',
   text: 'Tears to me eyes!'

});

commentList.push({
   name: 'Hairy Henderson',
   date: '2010/03/25',
   text: 'Such Elegance!'

});

commentList.push({
   name: 'Shamus The One Leg',
   date: '2012/12/17',
   text: 'Wonderous!'

});

// populate each entry comment
// entryList.forEach(function(entry) {
//   entry.comments = commentList;
// });


db.Entry.remove({}, function(err, entry){

   db.Entry.create(entryList, function(err, entry){
      if (err) { return console.log('ERROR', err); }
      console.log("all entry:", entry);
      console.log("created", entry.length, "entry");
      process.exit();
   });
});

db.Comment.remove({}, function(err, comment){
   //
   //    db.Comment.create(commentList, function(err, comment){
   //       if (err) { return console.log('ERROR', err); }
   //       console.log("all comment:", comment);
   //       console.log("created", comment.length, "comment");
   //       process.exit();
   //    });
});
