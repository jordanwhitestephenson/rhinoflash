
    var imageArray = ['"../img/random/blackcugpink.png"', '"../img/random/slothpink.png"', '"../img/random/giraffepink.png"', '"../img/random/kangaroo.png"', '"../img/random/goatpink.png"', '"../img/random/monkeypink.png"', '"../img/random/tazpink.png"' ];

$(document).ready(function() {
    var myEmail = decodeURIComponent(window.location.search).split("=")[1];
    console.log(myEmail);

    $('body').on("click", ".larg div h3", function() {
        $(this).parent().children('p').slideToggle(250);
    });
    $.ajax({
        method: 'GET',
        url: `https://rhinocards.herokuapp.com/username/${myEmail}`,
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(users) {
      $('.title h5').append('<h5>' + 'Hello Rhino Flash Member : ' +  users[0].name + '</h5>')
    })

// <--clicking on user overview-->
    $('#member').on("click", "a", function() {
      $('#welcomeBear').remove()

        $.ajax({
            method: 'GET',
            url: `https://rhinocards.herokuapp.com/username/${myEmail}`,
            contentType: "application/json",
            data: JSON.stringify()
        }).then(function(users) {
            console.log(users);
            $('.div1 h3').text('Welcome : ' + users[0].name + ' !');
            $('.userDecks h3').text(users[0].name + " 's" + 'Decks : ');
            $('.userDecks').append(`<h6><a href ="/showDecks.html?email=${myEmail}"> SHOW ALL DECKS </a> </h6>`);
            $('.imageDiv').children('p').append('<img src =' + imageArray[users[0].userImage] + '>');
            $('.div2 p').append(`<p> Your Email  : ${users[0].email} </p>`)
            $('.div2').append(`<p> Favorited Subject  : ${users[0].subject_name} </p>`);

            var unique = _.uniqBy(users, 'deck_name')
            var pluck = unique.map(function(deck) {
                return _.get(deck, 'deck_name')
            });
            console.log(unique)
            unique.forEach(function(deck) {
                console.log('this is forEach', deck);

                $('.userDecks p').append(`<div class = "deckcontainer"><a href=${deck.deck_name}</a> ${deck.deck_name}  <button type="button"  class="delete-btn" data-id= ${deck.deck_id}><span i class= "material-icons">delete</i></span></button></div>`);
            });


            //  <--BADGES-->
            if (users[0].fiveDeckBadge >= 5) {
                $('.badgeArea').append('<img src="../img/5badge.png">');
            }
            else if (users[0].perfectScore >= 1) {
                $('.badgeArea').append('<img src="../img/perfectscore.png">');
            }

            else if (users[0].fiveFavorites <= 3) {
                $('.badgeArea').append('<img src="../img/5commentsbadge.png">');
            }
            else {
              $('.badgeArea').append('<p>' + "NO BADGES" + '</p>');
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



    });

    $('#monkey').on('click', function() {
        window.location = `/makeDeck.html?email=${myEmail}`
    });
    $('#play').on("click", "a", function() {
        window.location = `/play.html?email=${myEmail}`
    });
    $('#study').on("click", "a", function() {
        window.location = `/study.html?email=${myEmail}`
    });
    $('#showAllDecks').on("click", "a", function() {
        window.location = `/showDecks.html?email=${myEmail}`
    });
});
