var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);
var deckID = decodeURIComponent(window.location.search).split("=")[2];
console.log(deckID)
let submitCase = false;
$(document).ready(function() {

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

    $(".mat-input").focus(function(){
      $(this).parent().addClass("is-active is-completed");
    });

    $(".mat-input").focusout(function(){
      if($(this).val() === "")
        $(this).parent().removeClass("is-completed");
      $(this).parent().removeClass("is-active");
    })

    $.ajax({
        method: 'GET',
        url: `https://rhinocards.herokuapp.com/deck/${deckID}`,
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(deck) {
      console.log(deck[0]);
        $('.deckTitleHere').append(`<center><h2> Deck Name : ${deck[0].deck_name} </h2></center>`)
            $('.appendHere').append(`<div class="section no-pad-bot" id="index-banner">
            <div class="container">
                <br><br>
                <div id="wrap">
                    <div class="container">
                        <div class="row" id="midrow">
                            <div class="flip-container" id="flashcard">
                                <div class="flipper">
                                    <div class="front">
                                        <span id="flashcard--content_en">${deck[0].front}</span>
                                        <button class="flag"><i class="fa fa-flag" aria-hidden="true"></i></button>
                                    </div>` +
                                    `<div class="back">
                                        <span id="flashcard--content_es">${deck[0].back}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
    });
    // <--CARD FLIPPER-->
    var flashcard = document.getElementById('flashcard');
    var refreshBtns = document.getElementsByClassName('refresh');

    $(document).on('click', '.submitButton', function(event) {
        event.preventDefault();
        $('.flip-container').addClass('flipped');
        submitCase = true;
    });
    $(document).on('click', '#flashcard', function(event) {
      event.preventDefault();
      if (submitCase){
        this.classList.toggle('flipped');
      }
    });
});
