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
      var entryRow = $(this).closest('.entry');
      var entryId = entryRow.data('entry-id');
      console.log('clicked edit button');
      buttonToggle(true, entryRow);
      var entryTitle = entryRow.find('span.entry-title');
      var editTitle = entryRow.find('input.edit-entry-title');
      toggleEdit(entryTitle, editTitle);

      var entryDate = entryRow.find('span.entry-date');
      var editDate = entryRow.find('input.edit-entry-date');
      toggleEdit(entryDate, editDate);

      var entryText = entryRow.find('span.entry-text');
      var editText = entryRow.find('input.edit-entry-text');
      toggleEdit(entryText, editText);
   });

   ///////////////toggling function for hiding entry text during edit/////////////////
   function toggleEdit(entry, edit) {
      edit.val(entry.text());
      entry.toggleClass('hidden', true);
      edit.toggleClass('hidden', false);
   }

   function toggleCancel(entry, edit) {
      entry.toggleClass('hidden', false);
      edit.toggleClass('hidden', true);
   }

   function toggleSave(entry, edit) {
      entry.text(edit.val());
      entry.toggleClass('hidden', false);
      edit.toggleClass('hidden', true);
   }
   function saveTitle(entryRow) {
      var editTitle = entryRow.find('input.edit-entry-title');
      var entryTitle = entryRow.find('span.entry-main-title');
      entryTitle.text(editTitle.val());
   }

   ///////cancel button/////////////
   $entryList.on('click', '#cancelButton', function(){
      console.log('Cancel button clicked');
      var entryRow = $(this).closest('.entry');
      undoForm(entryRow);
   });

   /////////////////////button toggling on edit field/////////////
   function buttonToggle(editing, entryRow){

      //////////show the save changes button///////////
      entryRow.find('.save-entry').toggleClass('hidden', !editing);
      //////////////show cancel button/////////////
      entryRow.find('.cancel-entry').toggleClass('hidden', !editing);
      //////////////hide delete button/////////////
      entryRow.find('.delete-entry').toggleClass('hidden', editing);
      ///////////hide the edit button////////////
      entryRow.find('.edit-entry').toggleClass('hidden', editing);
   }

   /////////save button///////
   $entryList.on('click', '#saveButton', function(){
      console.log('Save button clicked');
      var entryRow = $(this).closest('.entry');
      var editTitle = entryRow.find('input.edit-entry-title');
      var entryTitle = entryRow.find('span.entry-title');
      var editDate = entryRow.find('input.edit-entry-date');
      var editText = entryRow.find('input.edit-entry-text');
      var params={
         title: editTitle.val(),
         date: editDate.val(),
         text: editText.val(),
      };
      $.ajax({
         method: 'PUT',
         url: '/api/entry/'+$(this).attr('data-id'),
         data: params,
         success: successBuilder(entryRow),
         error: errorBuilder(entryRow)
      });
   });
   //////////////////New Comment Click////////////////
   $entryList.on('click', '#newComment', function handleAddComment(e) {
      console.log('add-comment clicked!');
      var entryRow = $(this).closest('.entry');
      var editName = entryRow.find('input.comment-name');
      var editText = entryRow.find('textarea.comment-text');
      var entryId = entryRow.attr('data-id');
      console.log(entryId);
      console.log(editText.val());
      console.log(editName.val());
      var params={
         entryId: entryId,
         name: editName.val(),
         date: Date.now().toString(),
         text: editText.val()
      };
      /////HTTP "POST" comment code sent to server/////
      $.ajax({
         method: 'POST',
         url: '/api/comment',
         data: params,
         success: onCommentSuccess,
         error: onCommentError
      });
   });

   /////////////////New Comment End//////////////////////

   //////////////////Delete Comment Click////////////////
   $entryList.on('click', '#commentDelete', function(e) {
      console.log('delete-comment clicked!');
      var deleteMe = $(this).data('id');
      console.log(deleteMe);
      /////HTTP "POST" comment code sent to server/////
      $.ajax({
         method: 'DELETE',
         url: '/api/comment/' + deleteMe,
         success: onCommentDeleteSuccess,
         error: onCommentDeleteError
      });
   });

   ///////////////Put functions///////////////////
   function successBuilder(entryRow){
      return function (result, status, xhr){
         console.log('Edit success');
         keepForm(entryRow);
         // var editTitle = entryRow.find('input.edit-entry-title');
         // var entryTitle = entryRow.find('span.entry-title');
         // toggleSave(entryTitle, editTitle);

         //console.log(entryRow);
      };
   }

   function errorBuilder(entryRow){
      return function (result, status, xhr){
         console.log('Edit fail');
         undoForm(entryRow);
      };
   }

   function keepForm(entryRow) {
      saveTitle(entryRow);
      var entryTitle = entryRow.find('span.entry-title');
      var editTitle = entryRow.find('input.edit-entry-title');
      toggleSave(entryTitle, editTitle);

      var entryDate = entryRow.find('span.entry-date');
      var editDate = entryRow.find('input.edit-entry-date');
      toggleSave(entryDate, editDate);

      var entryText = entryRow.find('span.entry-text');
      var editText = entryRow.find('input.edit-entry-text');
      toggleSave(entryText, editText);

      buttonToggle(false, entryRow);
   }

   function undoForm(entryRow) {

      var entryTitle = entryRow.find('span.entry-title');
      var editTitle = entryRow.find('input.edit-entry-title');
      toggleCancel(entryTitle, editTitle);
      var entryDate = entryRow.find('span.entry-date');
      var editDate = entryRow.find('input.edit-entry-date');
      toggleCancel(entryDate, editDate);
      var entryText = entryRow.find('span.entry-text');
      var editText = entryRow.find('input.edit-entry-text');
      toggleCancel(entryText, editText);
      buttonToggle(false, entryRow);
   }
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

//////////////Comment "POST" confirmation data/////////////
function onCommentSuccess(json) {
   console.log(json, 'Comment Post SUCCESS! Yeah we posted it!');
   location.reload(true);
   //});
}

function onCommentDeleteError(json) {
   console.log('Comment Delete Error');
}


function onCommentDeleteSuccess(json) {
   console.log(json, 'Comment Deleted');
   location.reload(true);
}

function onCommentError() {
   console.log('ERROR! Uh oh, something in the comment went wrong!');
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

function handleEditClick(e){
   console.log('edit entry', entryId);
}

/////////////Handlebars renders post and get data to page///////////////
function renderEntry(entry) {
   var pullingInfo = $('#entryTemplate').html();
   var compileHB = Handlebars.compile(pullingInfo);
   var placingInfo = compileHB(entry);
   $('#entryPlace').prepend(placingInfo);
   //console.log(entry);
}

function removeEntry(entryId) {
   console.log(entryId);
   $('#' + entryId).remove();
}

//////////////Handlebars for comments/////////
Handlebars.registerHelper('commentsHelper', function(comments){
   var template = Handlebars.compile($('#commentTemplate').html());
   var allComments = "";
   comments.forEach(function(comment){
      allComments += template(comment);
   });
   return allComments;

});

//////////////////Comment Modal//////////////////
// function handleAddComment(e) {
//   console.log('add-comment clicked!');
//   console.log(e);
//   var entryRow = e.currentTarget.closest('.entry');
//   var entryId = entryRow.data('entry-id');
//   //var currentEntryId = $(this).closest('.entry').data('entry-id');
//   console.log('entry-id',currentEntryId);
//   // $('#commentModal').data('entry-id', currentEntryId);
//   // $('#commentModal').modal();
//}
