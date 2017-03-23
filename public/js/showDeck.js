$.ajaxSetup({xhrFields: { withCredentials: true } });
$.get('https://rhinocards.herokuapp.com/')
  .then(function(req, res) {
    if (req.user === undefined) {
      window.location.href = 'https://flashrhino.com';
    }
  })
  .catch(function(error) {
    console.log(error);
  })
  
var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);

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
        url: `https://rhinocards.herokuapp.com/username/${myEmail}`,
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(user) {
        var unique = _.uniqBy(user, 'deck_name');
        var pluck = unique.map(function(deck) {
            return _.get(deck, 'deck_name');
            console.log(unique)
        });
        unique.forEach(function(deck) {
            $('.col').append(`<div class="flip-container" id="flashcard" style="margin: 20px;"><div class="front"><div class="flipper"></div>
                    <span id="flashcard--content_en"><a href="${deck.deck_id}"></a>${deck.deck_name}</span>
                  </div>
                  </div>

                  <div class = "deckButtons">
                  <a class="waves-effect waves-light btn" id= ${deck.deck_id} href="play.html?email=${myEmail}?deck_id=${deck.deck_id}">Play</a>` +

                `<a class="btn unFavorite" id= ${deck.deck_id} href="">Favorite</a>` +

                `<a class="btn deleteButton" id= ${deck.deck_id} href="#"> Delete</a>`
                   +

                `<a class="waves-effect waves-light btn" id= ${deck.deck_id} href="/study.html?email=${myEmail}?deck_id=${deck.deck_id}">Study</a>
                  </div></div>`)
        });

        $(".unFavorite").click(function(event) {
            event.preventDefault();
            $(this).toggleClass("favorite")

            if ($(this).hasClass("favorite")) {
                var favoritedDeckID = $(this).attr('id');
                console.log(this)
                console.log('favorited', favoritedDeckID)

                var favoriteDecks = {
                    email: `${myEmail}`,
                    id: `${favoritedDeckID}`
                };
                $.ajax({
                    method: "POST",
                    url: "https://rhinocards.herokuapp.com/favorite",
                    data: JSON.stringify(favoriteDecks),
                    contentType: "application/json"
                }).then(response => {
                    console.log('success')
                })
            } else if ($(this).hasClass("unFavorite")) {
                var unfavoritedDeckID = $(this).attr('id');
                console.log(this)
                console.log('unfavorited', unfavoritedDeckID)
                var unfavoriteDecks = {
                    email: `${myEmail}`,
                    id: `${unfavoritedDeckID}`
                };
                $.ajax({
                    method: "DELETE",
                    url: "https://rhinocards.herokuapp.com/favorite",
                    data: JSON.stringify(unfavoriteDecks),
                    contentType: "application/json"
                }).then(response => {
                    console.log('deleted', unfavoriteDecks);
                });
            }
        });
        $('.deleteButton').on('click',function(event){
          event.preventDefault();
          var deleteID = $(this).attr('id');
          console.log(deleteID)
          console.log('YA!')
          $.ajax({
              method: "DELETE",
              url: `https://rhinocards.herokuapp.com/username/${myEmail}/${deleteID}`,
              data: JSON.stringify(unfavoriteDecks),
              contentType: "application/json"
          }).then(response => {
              console.log('deleted', unfavoriteDecks);
          });

        })
    });
});
