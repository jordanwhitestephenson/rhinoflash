
var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);

$(document).ready(function() {
    appendSubject()
    $('#showDeckClass').on('click', function() {
        window.location = `/showDecks.html?email=${myEmail}`
    });
    $('#showStudyClass').on('click', function() {
        window.location = `/study.html?email=${myEmail}`
    });
    $('#showPlayClass').on('click', function() {
        window.location = `/play.html?email=${myEmail}`
    });
    $('#showDashboardClass').on('click', function() {
        window.location = `/dashboard.html?email=${myEmail}`
    });

});


/*global $*/


$( "form" ).on( "submit", function( event ) {
  event.preventDefault();

  console.log( $( this ).serialize() );
});

let cardPost = {};
cardPost['email'] = myEmail;
let subjectPost = {};

function appendSubject() {
  $.ajax({
    method: 'GET',
    url: 'https://rhinocards.herokuapp.com/subject',
    contentType: 'application/json',
    data: JSON.stringify()
  }).then(function (subject) {
    console.log(subject);
    for (var i = 0; i < subject.length; i++) {
      $('.subjectSelection')
        .append(`<option class="dropval" id="${subject[i].name}">${subject[i].name}</option>`);
    }
  })
}

$(document).ready(function () {
  appendSubject()
  $('select').material_select();
});

// var selected = document.getElementById('dropdown1')
// console.log(selected);


$(document).on('click', '.dropval', function () {
  var id = $(this).text();
  cardPost['name'] = id;
  console.log("cardPost", cardPost);
  console.log(id)
});
//
// $("#addCard").click(function () {
//   front
//   back
//   deck_id
// });

// name
// subject
// ---drop down
// email

$("#addDeck").click(function () {
  $.ajax({
      url: 'https://rhinocards.herokuapp.com/deck',
      method: 'POST',
      data: JSON.stringify(cardPost),
      contentType: 'application/json; charset=utf-8',

    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((response) => {
      console.log('error');
    });
});


// flashcard: "id":1,"front":"history1 front","back":"history1 back","deck_id":1},

// Deck: [{"subject":"History","email":"Jeff@gmail.com","front":"history9 front","back":"history9 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history8 front","back":"history8 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history7 front","back":"history7 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history6 front","back":"history6 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history5 front","back":"history5 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history4 front","back":"history4 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history3 front","back":"history3 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history2 front","back":"history2 back","name":"history101","id":1},{"subject":"History","email":"Jeff@gmail.com","front":"history1 front","back":"history1 back","name":"history101","id":1}

// badge, subject, username, deck, favorite, flashcard
