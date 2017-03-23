var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);

$(document).ready(function() {
    appendSubject()
    $('.showDeckClass').on('click', function() {
        window.location = `/showDecks.html?email=${myEmail}`
    });
    $('.showStudyClass').on('click', function() {
        window.location = `/study.html?email=${myEmail}`
    });
    $('.showPlayClass').on('click', function() {
        window.location = `/play.html?email=${myEmail}`
    });
    $('.showDashboardClass').on('click', function() {
        window.location = `/dashboard.html?email=${myEmail}`
    });
    $('.makeDeckClass').on('click', function() {
        window.location = `/makeDeck.html?email=${myEmail}`
    });

});


/*global $*/


$("form").on("submit", function(event) {
    event.preventDefault();
    console.log($(this));
    console.log($('#NameOfDeck').val())
    var myNewDeck = {
        subject: $('#Subject').val(),
        email: `${myEmail}`,
        front: $('#Question').val(),
        back: $('#Answer').val(),
        name: $('#NameOfDeck').val()
    }
    $.ajax({
        method: "POST",
        url: "https://rhinocards.herokuapp.com/deck",
        data: JSON.stringify(myNewDeck),
        contentType: "application/json"
    }).then(response => {
        console.log(response)
    })
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
    }).then(function(subject) {
        console.log(subject);
        for (var i = 0; i < subject.length; i++) {
            $('.subjectSelection')
                .append(`<option class="dropval" id="${subject[i].name}">${subject[i].name}</option>`);
        }
    })
}

$(document).ready(function() {
    appendSubject()
    $('select').material_select();
});

$(document).on('click', '.dropval', function() {
    var id = $(this).text();
    cardPost['name'] = id;
    console.log("cardPost", cardPost);
    console.log(id)
});



$("#addDeck").click(function() {
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
