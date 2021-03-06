var myEmail = decodeURIComponent(window.location.search).split("=")[1];
var deckID = decodeURIComponent(window.location.search).split("=")[2];
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
  $('.Trivia').on('click', function() {
      window.location = `/trivia.html?email=${myEmail}`
  });
});

const anotherButton =`
<button class="btn waves-effect waves-light addCard" type="button" name="action" id="addCard-1">ANOTHER!
  <i class="material-icons left">replay</i>
  <i class="material-icons right">replay</i>
</button>
`
function everything(trivia) {
  let count = 0;
  let correctAnswerArray = [];
  let theQuestions = [];
  let theAnswers = [];
  let theCorrectAnswer = [];
  let allQuestions = {};
  let allQuestionsTwo = {};
  correctAnswerArray.push('Get ready!')

  trivia.forEach((current) => {
    const randomNumber = Math.floor(Math.random() * 3);
    theQuestions = current.question;
    theAnswers = current.incorrect_answers;
    theCorrectAnswer = current.correct_answer;
    correctAnswerArray.push(theCorrectAnswer)
    theAnswers.splice(randomNumber, 0, theCorrectAnswer);
    theAnswers.push(randomNumber);
    allQuestionsTwo[theQuestions] = theAnswers;
  });
  console.log(allQuestionsTwo);
  allQuestionsTwo = JSON.stringify(allQuestionsTwo)
  console.log(allQuestionsTwo);
  allQuestions = decodeURIComponent(allQuestionsTwo);
  allQuestions = JSON.parse(allQuestions)
  console.log(allQuestions);

  const questionArea = document.getElementsByClassName('questions')[0];
  const answerArea = document.getElementsByClassName('answers')[0];
  const checker = document.getElementsByClassName('checker')[0];
  let current = 0;

  function loadQuestion(curr) {
    $('.actualAnswer').text(correctAnswerArray[count])
    count++;
    const question = Object.keys(allQuestions)[curr];
    questionArea.innerHTML = '';
    questionArea.innerHTML = question;
  }

  function loadAnswers(curr) {
    const answers = allQuestions[Object.keys(allQuestions)[curr]];
    answerArea.innerHTML = '';
    for (var i = 0; i < answers.length -1; i += 1) {
      var createDiv = document.createElement('div')
      var text = document.createTextNode(answers[i]);
      createDiv.appendChild(text);
      createDiv.addEventListener('click', checkAnswer(i, answers));
      answerArea.appendChild(createDiv);
    }
  }
  function checkAnswer(i, arr) {
    return () => {
      const givenAnswer = i;
      const correctAnswer = arr[arr.length - 1];

      if (givenAnswer === correctAnswer) {
        addChecker(true);
      } else {
        addChecker(false);
      }

      if (current < Object.keys(allQuestions).length - 1) {
        current += 1;

        loadQuestion(current);
        loadAnswers(current);
      } else {
        $('.anotherButton').append(anotherButton);
        questionArea.innerHTML = 'Done';
        answerArea.innerHTML = '';
      }
    };
  }

  function addChecker(bool) {
    const createDiv = document.createElement('div');
    const txt = document.createTextNode(current + 1);
    createDiv.appendChild(txt);
    if (bool) {
      createDiv.className += 'correct';
      checker.appendChild(createDiv);
    } else {
      createDiv.className += 'false';
      checker.appendChild(createDiv);
    }
  }

  loadQuestion(current);
  loadAnswers(current);
}
$('.anotherButton').click(() => {
  location.reload();
});
$.ajax({
  method: 'GET',
  url: 'https://opentdb.com/api.php?amount=15&difficulty=medium',
  data: JSON.stringify(),
}).then((trivia) => {
  everything(trivia.results);
});
