var entryList=[];

                  entryList.push({
                     title: 'Beans',
                     date: 2000/11/02,
                     text: 'Beans, beans, the musical fruit. The more you eat, the more you toot. The more you toot, the better you feel. So eat your beans at every meal!',
                     comments: []
                  });

                  entryList.push({
                     title: 'Here is to..',
                     date: 2000/11/02,
                     text: 'Here is to a long life and a merry one. A quick death and an easy one. A pretty girl and an honest one. A cold pint-- and another one!',
                     comments: []

                  });



                  $(document).ready(function() {
                    console.log('app.js loaded!');

                    $.ajax ({
                     method: 'GET',
                     datatype: 'json',
                     url: './api',
                     success: onSuccess,
                     error: onError

                  });
               //    $.ajax ({
               //     method: 'POST',
               //     datatype: 'json',
               //     url: './api/models/entry',
               //     success: onSuccess,
               //     error: onError
                //
               //  });

                function onSuccess() {
                   console.log('SUCCESS! Yeah it happened...you know IT!');
                }
                function onError() {
                   console.log('ERROR! Uh oh, something went wrong!');
                }
                  });





                  // this function takes a single entry and renders it to the page
                  function renderHandlebars(json) {
                     var pullingInfo = $('#formInfo').html();
                     var compileHB = Handlebars.compile(pullingInfo);
                     var placingInfo = compileHB(json);
                     $('#entryPlace').prepend(html);


                    console.log('rendering entry:', entry);

                  }
