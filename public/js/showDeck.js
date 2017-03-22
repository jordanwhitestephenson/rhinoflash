var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);

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



    $.ajax({
        method: 'GET',
        url: `https://rhinocards.herokuapp.com/username/${myEmail}`,
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(user) {
        var unique = _.uniqBy(user, 'deck_name');
        console.log(user)
        var pluck = unique.map(function(deck) {
            return _.get(deck, 'deck_name');
        });
        unique.forEach(function(deck) {
            console.log(unique)
            $('.col').append(`<div class="flip-container" id="flashcard" style="margin: 20px;"><div class="front"><div class="flipper"></div>
                    <span id="flashcard--content_en"><a href="${deck.deck_id}"></a>${deck.deck_name}</span>
                  </div>
                  </div>
                  <div class = "deckButtons">
                  <a class="waves-effect waves-light btn-large" id= ${deck.deck_id} href="play.html?email=${myEmail}?deck_id=${deck.deck_id}">Play</a>` +

                  `<a class="btn-large unFavorite" id= ${deck.deck_id} href="">Favorite</a>` +

                  `<a class="waves-effect waves-light btn-large" id= ${deck.deck_id} href="/study.html?email=${myEmail}?deck_id=${deck.deck_id}">Study</a>
                  </div></div>`)
        });

        $('.unFavorite').on('click', function(event) {
            event.preventDefault();
            // var favoriteDeck = $(this).attr('id');

              $(this).toggleClass("favorite")


            //     'background-color': 'yellow',
            //     'width': '50px',
            //     'height': '40px',
            //     'font-size': '8px',
            //     'color': '#000',
            //     'padding-right': '80px',
            //     'font-weight': '600',
            //     'padding-bottom': '50px'
            // }).text('Favorited!')

            var favoriteDecks = {
                email: `${myEmail}`,
                id: `${favoriteDeck}`
            };
        //     $.ajax({
        //             method: "POST",
        //             url: "https://rhinocards.herokuapp.com/favorite",
        //             data: JSON.stringify(favoriteDecks),
        //             contentType: "application/json"
        //         })
        //         .then(response => {
        //             function changeClass() {
        //                 $('.waves-effect.waves-light.btn-large.favorite').removeClass('favorite');
        //                 $(this).addClass('newFavorite')
        //                 event.preventDefault();
        //             }
        //             $('.favorite').on('click', changeClass);
        //         });
        //         if ($('.waves-effect.waves-light.btn-large').hasClass('.newFavorite')){
        //           ('.newFavorite').text('YA!')
        //           var unfavoriteDeck = $(this).attr('id');
        //           var unfavoriteDecks = {
        //               email: `${myEmail}`,
        //               id: `${unfavoriteDeck}`
        //           };
        //           $.ajax({
        //                   method: "DELETE",
        //                   url: "https://rhinocards.herokuapp.com/favorite",
        //                   data: JSON.stringify(unfavoriteDecks),
        //                   contentType: "application/json"
        //               }).then(response => {
        //                 console.log('unfavorited', response)
        //               })
        //
        //         }
        });
    });
});
