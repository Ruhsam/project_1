// var entryList= [{
//
//                      title: 'Beans',
//                      date: '2000/11/02',
//                      text: 'Beans, beans, the musical fruit. The more you eat, the more you toot. The more you toot, the better you feel. So eat your beans at every meal!',
//                      comments: []
//                   },
//                   {
//                      title: 'Here is to..',
//                      date: '2000/11/02',
//                      text: 'Here is to a long life and a merry one. A quick death and an easy one. A pretty girl and an honest one. A cold pint and another one!',
//                      comments: []
//
//                   }];


$(document).ready(function() {
   console.log('app.js loaded!');



   $.ajax ({
      method: 'GET',
      url: '/api/entry',
      success: onSuccess
   });

   // $.get('/api').success(function(returnedEntry) {
   //    console.log(returnedEntry);
   //     entryList.forEach(function(entry){
   //       renderEntry(entry);
   //     });
   //
}); // end of document ready

// $('#formInfo').on('submit', function(e) {
//    e.preventDefault();
//    $.ajax({
//       method: 'POST',
//       url: '/api/books',
//       data: $(this).serialize(),
//       success: newBookSuccess,
//       error: newBookError
//    });
// });


function onSuccess(json) {
  console.log(json, 'SUCCESS! Yeah it happened...you know, IT!');
  json.forEach(function(entry) {
     renderEntry(entry);
  });
}
function onError() {
  console.log('ERROR! Uh oh, something went wrong!');
}






// this function takes a single entry and renders it to the page
function renderEntry(entry) {
   var pullingInfo = $('#entryTemplate').html();
   var compileHB = Handlebars.compile(pullingInfo);
   var placingInfo = compileHB(entry);
   $('#entryPlace').prepend(placingInfo);


   console.log('rendering entry:', entry);

}
