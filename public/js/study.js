var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);
var deckID = decodeURIComponent(window.location.search).split("=")[2];
console.log(deckID)
$(document).ready(function() {

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

    $.ajax({
        method: 'GET',
        url: `https://rhinocards.herokuapp.com/deck/${deckID}`,
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(deck) {
          $('.deckTitleHere').append(`<center><h2> Deck Name : ${deck[0].deck_name} </h2></center>`)


        deck.forEach(function(card) {
          console.log(card)



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
                                        <button class="flag"><i class="fa fa-flag" aria-hidden="true"></i></button>
                                    </div>
                                    <div class="back">
                                        <span id="flashcard--content_es">${card.back}</span>
                                    </div>
                                </div>
                            </div>

                            <div class="button-container">
                                <button class="refresh"><i class="fa fa-angle-left" aria-hidden="true"></i></button>
                                <button class="refresh"><i class="fa fa-random" aria-hidden="true"></i></button>
                                <button class="refresh"><i class="fa fa-angle-right" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
        });
    });
});
