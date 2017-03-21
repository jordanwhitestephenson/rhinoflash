$(document).ready(function() {
    var myEmail = decodeURIComponent(window.location.search).split("=")[1];
    console.log(myEmail);

    $('body').on("click", ".larg div h3", function() {
        $(this).parent().children('p').slideToggle(250);
    });

    $('#member').on("click", "a", function() {
        $.ajax({
            method: 'GET',
            url: `https://flash-backend.herokuapp.com/username/${myEmail}`,
            contentType: "application/json",
            data: JSON.stringify()
        }).then(function(users) {
            console.log(users);
            $('.div1 h3').text('Welcome : ' + users[0].name + ' !');
            $('.userDecks h3').text(users[0].name + " 's" + 'Decks : ');

            var unique = _.uniqBy(users, 'deck_name')
            var pluck = unique.map(function(deck) {
                return _.get(deck, 'deck_name')
            })
            unique.forEach(function(deck){
              console.log('this is forEach',deck)
               $('.userDecks p').append(`<div class = "deckcontainer"><a href=${deck.deck_name}</a> ${deck.deck_name}  <button type="button"  class="delete-btn" data-id= ${deck.deck_id}><span i class= "material-icons">delete</i></span></button></div>`);

            })

            console.log('this is pluck',pluck)
            console.log('this is unique', unique)

          //  <--BADGES-->
            if (users[0].fiveDeckBadge >= 5) {
                $('.badgeArea').append('<img src="../img/5badge.png">');
            }
            if (users[0].perfectScore >= 1) {
                $('.badgeArea').append('<img src="../img/perfectscore.png">')
            }

            if (users[0].fiveFavorites <= 3) {
                $('.badgeArea').append('<img src="../img/5commentsbadge.png">');
            }
        });

        var title = $(this).data('title');
        var userBadges = $(this).data('userbadge');
        var body = $(this).data('body');
        var heading = $(this).data('heading');
        var about = $(this).data('about');
        var userbio = $(this).data('userbio');
        var userStats = $(this).data('userstats');
        var statOverview = $(this).data('statoverview');

        $('.title').children('h2').append(title);
        $('.div1').children('p').html(body);
        $('.div1').children('h3').html(heading);
        $('.div2').children('h3').html(about);
        $('.div2').children('p').html(userbio);
        $('.div3').children('p').html(userStats);
        $('.div3').children('h3').html(statOverview);

        var imageArray = ['"../img/profile/blackcugpink.png"', '"../img/profile/slothpink.png"','"../img/profile/pugpink.png"', '"../img/profile/goatpink.png"', '"../img/profile/monkeypink.png"']
        var random = Math.floor((Math.random() * 10) + 1);

        $('.imageDiv').children('p').html('<img src =' + imageArray[random] + '>');

    });
});
