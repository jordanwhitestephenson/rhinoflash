$.ajaxSetup({xhrFields: { withCredentials: true } });
$.get('https://rhinocards.herokuapp.com/isLoggedIn')
  .then(function(isLoggedIn) {
    if (!isLoggedIn) {
      window.location.href = 'https://flashrhino.com';
    }
  })
  .catch(function(error) {
    console.log(error);
  })

$(function() {
  var myEmail = decodeURIComponent(window.location.search).split("=")[1];
  console.log(myEmail);
  var cardCount = 1;
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
  $('.Trivia').on('click', function() {
      window.location = `/trivia.html?email=${myEmail}`
  });

  $('.addCard').on('click', function(event) {
    event.preventDefault();
    ++cardCount;
    $('.card-section').append(`
      <div class="input-field col s6">
          <input id="Question-${cardCount}" type="text" class="validate">
          <label>Question</label>
      </div>
      <div class="input-field col s6">
          <input id="Answer-${cardCount}" type="text" class="validate">
          <label>Answer</label>
      </div>
      `)
  })

  $('.submit-deck').on('click', function(event) {
    var deckObject = {};
    event.preventDefault();
    deckObject.name = $('#NameOfDeck').val();
    deckObject.email = myEmail;
    deckObject.subject = $('#Subject option:selected').val();
    console.log(deckObject);
    $.post('https://rhinocards.herokuapp.com/deck', deckObject)
      .then(function(data, status) {
        var createCards = [];
        var deckName = deckObject.name;
        for (let i = 0; i < cardCount; i++) {
          var cardFront = $('#Question-' + (i + 1)).val();
          var cardBack = $('#Answer-' + (i + 1)).val();
          var cardObject = {front: cardFront, back: cardBack, name: deckName};
          console.log('card Object:',cardObject);
          createCards.push($.post('https://rhinocards.herokuapp.com/flashcard', cardObject))
        }
        Promise.all(createCards)
        .then(() => {
          window.location.href = 'https://flashrhino.com/dashboard.html?email=' + myEmail;
        })
      })
      .catch(function(error) {
        console.log('ERRORRR',error);
      })

  })

  // $("form").on("submit", function(event) {
  //     event.preventDefault();
  //     console.log($(this));
  //     console.log($('#NameOfDeck').val())
  //     var myNewDeck = {
  //         subject: $('#Subject').val(),
  //         email: `${myEmail}`,
  //         front: $('#Question').val(),
  //         back: $('#Answer').val(),
  //         name: $('#NameOfDeck').val()
  //     }
  //     $.ajax({
  //         method: "POST",
  //         url: "https://rhinocards.herokuapp.com/deck",
  //         data: JSON.stringify(myNewDeck),
  //         contentType: "application/json"
  //     }).then(response => {
  //         console.log(response)
  //     })
  // });


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
          for (var i = 0; i < subject.length; i++) {
              $('.subjectSelection')
                  .append(`<option class="dropval" id="${subject[i].name}">${subject[i].name}</option>`);
          }
      })
  }

  // $(document).ready(function() {
  //     appendSubject()
  //     $('select').material_select();
  // });

  // $(document).on('click', '.dropval', function() {
  //     var id = $(this).text();
  //     cardPost['name'] = id;
  //     console.log("cardPost", cardPost);
  //     console.log(id)
  // });



  // $("#addDeck").click(function() {
  //     $.ajax({
  //             url: 'https://rhinocards.herokuapp.com/deck',
  //             method: 'POST',
  //             data: JSON.stringify(cardPost),
  //             contentType: 'application/json; charset=utf-8',
  //
  //         })
  //         .then((response) => {
  //             console.log('response', response);
  //         })
  //         .catch((response) => {
  //             console.log('error');
  //         });
  // });
})
