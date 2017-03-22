var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);
var deckID = decodeURIComponent(window.location.search).split("=")[2];
console.log(deckID)
let submitCase = false;
let answer;
let back;
let globalDeck;
let count = 0;
let correct = [];
let cardAnswers = [];
const rightAnswer = `<img src="img/right.png" alt="checkmark" class="rightWrong">`;
const wrongAnswer = `<img src="img/wrong.png" alt="checkmark" class="rightWrong">`;
const rightAnswerSmall = `<img src="img/right.png" alt="checkmark" class="rightWrong" style="width:70px;height:auto;">`;
const wrongAnswerSmall = `<img src="img/wrong.png" alt="checkmark" class="rightWrong" style="width:70px;height:auto;">`;


$(document).ready(function () {

  $('#showDeckClass').on('click', function () {
    window.location = `/showDecks.html?email=${myEmail}`
  });
  $('#showStudyClass').on('click', function () {
    window.location = `/study.html?email=${myEmail}`
  });
  $('#showPlayClass').on('click', function () {
    window.location = `/play.html?email=${myEmail}`
  });
  $('#showDashboardClass').on('click', function () {
    window.location = `/dashboard.html?email=${myEmail}`
  });

  $(".mat-input").focus(function () {
    $(this).parent().addClass("is-active is-completed");
  });

  $(".mat-input").focusout(function () {
    if ($(this).val() === "")
      $(this).parent().removeClass("is-completed");
    $(this).parent().removeClass("is-active");
  })

  $.ajax({
    method: 'GET',
    url: `https://rhinocards.herokuapp.com/deck/${deckID}`,
    contentType: "application/json",
    data: JSON.stringify()
  }).then(function (deck) {
    globalDeck = deck;
    back = deck[0].back;
    console.log(deck[0]);
    $('.deckTitleHere').append(`<center><h2> Deck Name : ${deck[0].deck_name} </h2></center>`)
    $('.appendHere').append(`<div class="section no-pad-bot" id="index-banner">
            <div class="container">
                <br><br>
                <div id="wrap">
                    <div class="container">
                        <div class="row" id="midrow">
                            <div class="flip-container " id="flashcard">
                                <div class="flipper">
                                    <div class="front">
                                        <span id="flashcard--content_en">${deck[count].front}</span>
                                        <button class="flag"><i class="fa fa-flag" aria-hidden="true"></i></button>
                                    </div>` +
      `<div class="back">
                                        <span id="flashcard--content_es">${deck[count].back}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`)
  });

  function finishedDeck () {
    $('.appendHere').empty();
    $('.answerLine').empty();
    globalDeck.forEach(function(card, i) {
      var distinguishCorrect;
      if (correct[i]) {
        distinguishCorrect = rightAnswerSmall;
      } else {
        distinguishCorrect = wrongAnswerSmall;
      }
        $('.deckTitleHere').append(`<div class="section no-pad-bot" id="index-banner">
        <div class="container">
            <br><br>
            <div id="wrap">
                <div class="container">
                    <div class="row" id="midrow">
                        <div class="flip-container" id="flashcard">
                            <div class="flipper">
                                <div class="front">
                                <div class="topCorner">
                                ${distinguishCorrect}
                                </div>
                                    <span id="flashcard--content_en">${card.front}</span>
                                    <button class="flag"><i class="fa fa-flag" aria-hidden="true"></i></button>
                                </div>` +
                                `<div class="back">
                                <div class="topCorner">
                                ${distinguishCorrect}
                                </div>
                                    <span id="flashcard--content_es">${card.back}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="userAnswer">
                      <span id="asljdf">Your Answer:&nbsp</span>
                      <span id="flashcard--content_es">${cardAnswers[i]}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`)
    });
    console.log(correct);
  }

  $(document).on('click', '.nextQuestion', function (event) {
    event.preventDefault();
    if (count < globalDeck.length) {
      submitCase = false;
      $('.wrapper').empty()
      document.getElementById("flashcard--content_en").innerHTML = globalDeck[count].front;
      document.getElementById("flashcard--content_es").innerHTML = globalDeck[count].back;
      $('.nextQuestion').text('submit')
      $('.nextQuestion').addClass('submitButton')
      $('.submitButton').removeClass('nextQuestion')
      $('.flip-container').removeClass('flipped');
      $('.answerInput').val('')
    } else {
      finishedDeck()
    }
  });

  var flashcard = document.getElementById('flashcard');
  var refreshBtns = document.getElementsByClassName('refresh');

  function checkAnswer(answer) {
    cardAnswers.push(answer)
    if (answer.toUpperCase() === globalDeck[count].back.toUpperCase()) {
      correct.push(1);
      $('.wrapper').append(rightAnswer);
    } else {
      correct.push(0);
      $('.wrapper').append(wrongAnswer);
    }
    count++;
    $('.submitButton').text('Next question')
    $('.submitButton').addClass('nextQuestion')
    $('.nextQuestion').removeClass('submitButton')
  }

  $(document).keypress(function (event) {
    if (event.keyCode == 13) {
      $(".universalButton").click();
    }
  });

  $(document).on('click', '.submitButton', function (event) {
    event.preventDefault();
    if (!submitCase) {
      answer = $('.answerInput').val()
      checkAnswer(answer);
      $('.flip-container').addClass('flipped');
      submitCase = true;
    }
  });
  $(document).on('click', '#flashcard', function (event) {
    event.preventDefault();
    if (submitCase) {
      this.classList.toggle('flipped');
    }
  });
});
