var db = require('./models');

var entryList=[];

                  entryList.push({
                     title: 'Beans',
                     date: 2000/11/02,
                     text: 'Beanz, beans, the musical fruit. The more you eat, the more you toot. The more you toot, the better you feel. So eat your beans at every meal!',
                     comments: []
                  });

                  entryList.push({
                     title: 'Here is to..',
                     date: 2000/11/02,
                     text: 'Here is to a long life and a merry one. A quick death and an easy one. A pretty girl and an honest one. A cold pint-- and another one!',
                     comments: []

                  });

var commentList = [];

  commentList.push({
     name: 'Buttface one',
     date: 2001/12/03,
     text: 'well done sir, you have captured our hearts yet again!'

 });

  commentList.push({
     name: 'Angry Frenchman',
     date: 2002/10/05,
     text: 'A modern day Bill Shakespeare'

 });

db.Entry.remove({}, function(err, entry){

  db.Entry.create(entryList, function(err, entry){
    if (err) { return console.log('ERROR', err); }
    console.log("all entry:", entry);
    console.log("created", entry.length, "entry");
    process.exit();
  });
  });
