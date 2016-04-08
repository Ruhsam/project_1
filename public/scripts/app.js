$(document).ready(function() {
console.log('app.js loaded!');

$.ajax({
 method: 'GET',
 url: '/api/controllers',
 data: formData,
 success: formGetResponse,
 error: formErrorResponse
});

$.ajax({
 method: 'POST',
 url: '/api/controllers',
 data: formData,
 success: formSubmitResponse,
 error: formErrorResponse
});

function formSubmitResponse(json) {
  console.log("Success to the MAX!", json);
}

function formErrorResponse(json) {
   console.log("Error, form was not submitted", json);
}

function formGetResponse(json) {
   console.log("Got this sick info!", json);
}



});
