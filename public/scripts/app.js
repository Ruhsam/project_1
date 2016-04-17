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

 //////////////Edit Button////////////////////
 $entryList.on('click', '#editButton', function(){
   var $entryRow = $(this).closest('.entry');
   var entryId = $entryRow.data('entry-id');
  console.log('clicked edit button');
  //////////show the save changes button///////////
  $entryRow.find('.save-entry').toggleClass('hidden', 'add');
  ///////////hide the edit button////////////
  $entryRow.find('.edit-entry').toggleClass('hidden', 'remove');
  //////////////show cancel button/////////////
  $entryRow.find('.cancel-entry').toggleClass('hidden', 'add');
  //////////////hide delete button/////////////
  $entryRow.find('.delete-entry').toggleClass('hidden', 'remove');

 //  $.ajax({
 //     method: 'PUT',
 //     url: '/api/entry/'+$(this).attr('data-id'),
 //     data: JSON.stringify(entryList.),
 //     data-type: 'json',
 //     success: onPutSuccess,
 //     error: onPutError
 // });
});

///////cancel button/////////////
 $entryList.on('click', '#cancelButton', function(){
console.log('Cancel button clicked');
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
  location.reload(true);
  //});
}
function onPostError() {
  console.log('ERROR! Uh oh, something went wrong!');
}
//////////////"DELETE" confirmation data/////////////
function onDeleteSuccess(deletedEntry) {
  console.log(deletedEntry, 'Delete SUCCESS! Well there goes that!');
  removeEntry(deletedEntry._id);
  //});
}
function onDeleteError() {
  console.log('Delete ERROR! Uh oh, something went wrong!');
}
///////////////Put functions///////////////////
function onPutSuccess(){
   console.log('Edit success');
}
function handleEditClick(e){

      console.log('edit entry', entryId);




   // var entryTitle=$
   // $

}
/////////////Renders post and get data to page///////////////
function renderEntry(entry) {
   var pullingInfo = $('#entryTemplate').html();
   var compileHB = Handlebars.compile(pullingInfo);
   var placingInfo = compileHB(entry);
   $('#entryPlace').prepend(placingInfo);

}

function removeEntry(entryId) {
   console.log(entryId);
   $('#' + entryId).remove();
}
