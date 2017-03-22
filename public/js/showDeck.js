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
                  <a class="waves-effect waves-light btn-large" data-id= ${deck.deck_id} href="play.html?email=${myEmail}?deck_id=${deck.deck_id}">Play</a>
                  <a class="waves-effect waves-light btn-large favorite" data-id= ${deck.deck_id} href="#">Favorite</a>
                  <a class="waves-effect waves-light btn-large" data-id= ${deck.deck_id} href="/study.html?email=${myEmail}?deck_id=${deck.deck_id}">Study</a>
                  </div></div>`)
        });
        $(document).on('click', '.favorite', function(event) {
            event.preventDefault();
            console.log('FLAGGED!')
            $(this).css({
                'background-color': 'yellow',
                'width': '50px',
                'height': '40px',
                'font-size': '8px',
                'color': '#000',
                'padding-right': '80px',
                'font-weight': '600',
                'padding-bottom': '50px'
            }).text('Favorited!');
        });
        // if ($('.favorite').has(":contains('Favorited')")){
        //     console.log('ya mast')
        // }
    })


});
