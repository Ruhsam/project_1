$(document).ready(function() {
   console.log('app.js loaded!');

   $.ajax ({
      method: 'GET',
      url: '/api/entry',
      success: onSuccess
   });

   $("#formInfo").on('submit', function(event) {
      event.preventDefault();
      var entry = $(this).serialize();

      console.log(entry);
  $.ajax({
     method: 'POST',
     url: '/api/entry',
     data: entry,
     success: onPostSuccess,
     error: onPostError
  });
});

}); // end of document ready

function onSuccess(json) {
  console.log(json, 'SUCCESS! Yeah it happened...you know, IT!');
  json.forEach(function(entry) {
     renderEntry(entry);
  });
}
function onError() {
  console.log('ERROR! Uh oh, something went wrong!');
}

///post confirmation data
function onPostSuccess(json) {
  console.log(json, 'Post SUCCESS! Yeah we posted it!');
  renderEntry(json);
  //});
}
function onPostError() {
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
