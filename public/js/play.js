var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);
var deckID = decodeURIComponent(window.location.search).split("=")[2];
console.log(deckID)
let submitCase = false;
let answer;
let back;
let checkmark = `
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 98.5 98.5" enable-background="new 0 0 98.5 98.5" xml:space="preserve">
        <path class="checkmark" fill="none" stroke-width="8" stroke-miterlimit="10" d="M81.7,17.8C73.5,9.3,62,4,49.2,4
        C24.3,4,4,24.3,4,49.2s20.3,45.2,45.2,45.2s45.2-20.3,45.2-45.2c0-8.6-2.4-16.6-6.5-23.4l0,0L45.6,68.2L24.7,47.3"/>
      </svg>
`

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
      back = deck[0].back;
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

    function checkAnswer(answer) {
      if (answer.toUpperCase() === back.toUpperCase()) {
        $('.wrapper').append(checkmark)
      } else {
        console.log('DUMBASS');
      }
    }

    $(document).on('click', '.submitButton', function(event) {
        event.preventDefault();
        answer = $('.answerInput').val()
        checkAnswer(answer);
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
