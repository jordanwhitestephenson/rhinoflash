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


function appendSubject() {

//     $.ajax({
//         method: 'GET',
//         url: 'https://flash-backend.herokuapp.com/subject',
//         contentType: "application/json",
//         data: JSON.stringify()
//     }).then(function(subject) {
//         for (var i = 0; i < subject.length; i++) {
//             $('.subject')
//                 .append('<li class="dropval" id="' + subject[i].name '"><a>' + subject[i].name + '</a></li>');
//         }
//     });
// }


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
  });
}
$(document).ready(function () {
  appendSubject();
});

$('.dropval').click(function() {
    console.log('lll');
    var id = $(this).attr('id');
    console.log(id);
});


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


$('#play').on("click", "a", function() {
    window.location = `/play.html?email=${myEmail}`
});
$('#study').on("click", "a", function() {
    window.location = `/study.html?email=${myEmail}`
});
}
