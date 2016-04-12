$(document).ready(function() {
   console.log('app.js loaded!');

    $entryList = $('#entryTarget');
///////HTTP "GET" code sent to server//////
   $.ajax ({
      method: 'GET',
      url: '/api/entry',
      success: onSuccess
   });
///////HTTP "POST" code sent to server//////
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

/////////////Delete button////////////////////
$entryList.on('click', '#deleteButton', function() {
   console.log('clicked delete button to', '/api/entry/'+$(this).attr('data-id'));
   $.ajax({
     method: 'DELETE',
     url: '/api/entry/'+$(this).attr('data-id'),
     success: onDeleteSuccess,
     error: onDeleteError
   });
 });


}); // end of document ready


//////////"GET" confimation data//////////////////
function onSuccess(json) {
  console.log(json, 'SUCCESS! Yeah it happened...you know, IT!');
  json.forEach(function(entry) {
     renderEntry(entry);
  });
}
function onError() {
  console.log('ERROR! Uh oh, something went wrong!');
}

//////////////"POST" confirmation data/////////////
function onPostSuccess(json) {
  console.log(json, 'Post SUCCESS! Yeah we posted it!');
  renderEntry(json);
  //});
}
function onPostError() {
  console.log('ERROR! Uh oh, something went wrong!');
}
//////////////"DELETE" confirmation data/////////////
function onDeleteSuccess(json) {
  console.log(json, 'Delete SUCCESS! Well there goes that!');
  renderEntry(json);
  //});
}
function onDeleteError() {
  console.log('Delete ERROR! Uh oh, something went wrong!');
}

/////////////Renders post and get data to page///////////////
function renderEntry(entry) {
   var pullingInfo = $('#entryTemplate').html();
   var compileHB = Handlebars.compile(pullingInfo);
   var placingInfo = compileHB(entry);
   $('#entryPlace').prepend(placingInfo);


   console.log('rendering entry:', entry);
}
