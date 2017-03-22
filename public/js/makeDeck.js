
var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);

$(document).ready(function() {
    appendSubject()
    $('#showDeckClass').on('click', function() {
        window.location = `/showdecks.html?email=${myEmail}`
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

let cardPost = {};
cardPost['email'] = 'Jordan@gmail.com';
let subjectPost = {};

function appendSubject() {
  console.log('hello');
  $.ajax({
    method: 'GET',
    url: 'https://rhinocards.herokuapp.com/subject',
    contentType: 'application/json',
    data: JSON.stringify()
  }).then(function (subject) {
    console.log(subject);
    console.log('hellejflakj');
    for (var i = 0; i < subject.length; i++) {
      $('.subjectSelection')
        .append(`<li class="dropval" id="${subject[i].name}"><a>${subject[i].name}</a></li>`);
    }
  })
}
$(document).ready(function () {
  appendSubject()
});

// var selected = document.getElementById('dropdown1')
// console.log(selected);


$(document).on('click', '.dropval', function () {
  var id = $(this).text();
  cardPost['name'] = id;
  console.log("cardPost", cardPost);
  console.log(id)
});

$("#addCard").click(function () {
  front
  back
  deck_id
});

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


// Card: {"front":"history1 front","back":"history1 back","deck_id":1}

// Deck: {"subject":"History","email":"Jeff@gmail.com","front":"history9 front","back":"history9 back","name":"history101","id":1}

// badge, subject, username, deck, favorite, flashcard
