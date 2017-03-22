<<<<<<< HEAD
$(document).ready(function() {
    appendSubject()
});


function appendSubject() {

    $.ajax({
        method: 'GET',
        url: 'https://flash-backend.herokuapp.com/subject',
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(subject) {
        for (var i = 0; i < subject.length; i++) {
            $('.subject')
                .append('<li class="dropval" id="' + subject[i].name '"><a>' + subject[i].name + '</a></li>');
        }
    })
}

=======
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
>>>>>>> ac981b16afdaee01c6d2cac7215af48a97f490e1

// var selected = document.getElementById('dropdown1')
// console.log(selected);


<<<<<<< HEAD
$('.dropval').click(function() {
    console.log('lll');
    var id = $(this).attr('id');
    console.log(id)
});



$("#addCard").click(function() {
    front
    back
    deck_id
=======
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
>>>>>>> ac981b16afdaee01c6d2cac7215af48a97f490e1
});

// name
// subject
// ---drop down
// email

<<<<<<< HEAD
$("#addDeck").click(function() {
    $.ajax({
        type: "POST",
        url: 'https://flash-backend.herokuapp.com',
        data: data,

=======
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
>>>>>>> ac981b16afdaee01c6d2cac7215af48a97f490e1
    });
});


// Card: {"front":"history1 front","back":"history1 back","deck_id":1}

// Deck: {"subject":"History","email":"Jeff@gmail.com","front":"history9 front","back":"history9 back","name":"history101","id":1}

// badge, subject, username, deck, favorite, flashcard
