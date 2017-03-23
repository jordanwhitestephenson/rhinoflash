$.ajaxSetup({xhrFields: { withCredentials: true } });

var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);
var deckID = decodeURIComponent(window.location.search).split("=")[2];
console.log(deckID)
$(document).ready(function() {

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

    $.ajax({
        method: 'GET',
        url: `https://rhinocards.herokuapp.com/deck/${deckID}`,
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(deck) {
        $('.deckTitleHere').append(`<center><h2> Deck Name : ${deck[0].deck_name} </h2></center>`)
        deck.forEach(function(card) {
            $('.appendHere').append(`<div class="section no-pad-bot" id="index-banner">
            <div class="container">
                <br><br>
                <div id="wrap">
                    <div class="container">
                        <div class="row" id="midrow">
                            <div class="flip-container" id="flashcard">
                                <div class="flipper">
                                    <div class="front">
                                        <span id="flashcard--content_en">${card.front}</span>
                                    </div>` +
                                    `<div class="back">
                                        <span id="flashcard--content_es">${card.back}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        });
    });
    // <--CARD FLIPPER-->
    var flashcard = document.getElementById('flashcard');
    var refreshBtns = document.getElementsByClassName('refresh');

    $(document).on('click', '#flashcard', function(event) {
        event.preventDefault();
        this.classList.toggle('flipped');
    });
});
