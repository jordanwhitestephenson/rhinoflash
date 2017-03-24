$.ajaxSetup({
    xhrFields: {
        withCredentials: true
    }
});
$.get('https://rhinocards.herokuapp.com/isLoggedIn')
    .then(function(isLoggedIn) {
        if (!isLoggedIn) {
            window.location.href = 'https://flashrhino.com';
        }
    })
    .catch(function(error) {
        console.log(error);
    })
var imageArray = ['"../img/random/blackcugpink.png"', '"../img/random/slothpink.png"', '"../img/random/giraffepink.png"', '"../img/random/kangaroo.png"', '"../img/random/goatpink.png"', '"../img/random/monkeypink.png"', '"../img/random/tazpink.png"'];

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
        console.log(users)
        if (users.length === 0) {
            $('.title').append('<center><p>' + 'We\'re Sorry, You\'re Not a Rhino Flash Member Yet!' + '<br>' + 'Please Register Your Account' + '</center></p>')
            $('.badgeArea').append('<p>' + "Why Don't Register and Earn Some Badges?" + '</p>');
        }
        $('.title h5').append('<h5>' + 'Welcome ' + users[0].name + '!' + '</h5>');
        appendThings()
    });

    // <--clicking on user overview-->
    function appendThings() {
        console.log('hello');
        $.ajax({
            method: 'GET',
            url: `https://rhinocards.herokuapp.com/username/${myEmail}`,
            contentType: "application/json",
            data: JSON.stringify()
        }).then(function(users) {
            console.log(users);

            if (users.length === 0) {
                console.log('YA!!')
                $('.div1 h3').append('<center><p>' + 'We\'re Sorry, You\'re Not a Rhino Flash Member Yet!' + '<br>' + 'Please Register Your Account' + '</center></p>')
                $('.imageDiv').remove()
                $('.div3 h3').remove()
                $('.div2').remove()
            }

            $('.imageDiv *').remove();
            $('.badgeArea *').remove();
            $('.div2  *').remove();
            $('.userDecks *').remove();
            $('.userDecks h3').text(users[0].name + " 's" + 'Decks : ');
            $('#dashboardStats').append(`<h3><a href ="/showDecks.html?email=${myEmail}"> Show All Decks </a> </h3>`);

            // <user image>
            if (users[0].userImage === null) {
                $('#img-wrapper').append('<img src ="../img/random/tazpink.png">');
            } else {
                $('#img-wrapper').append('<img src =' + imageArray[users[0].userImage] + '>');
            }

            if (users[0].subject_name === null) {
              $('#favoritedSubject').append('<p>' + 'None Yet' + '</p>')
            } else {
              $('#favoritedSubject').prepend('<p>' + users[0].subject_name + '</p>')
            }


            $('#dashboardEmail').append(`<p> ${users[0].email} </p>`)
            $('#userPosts').append(`<p>  ${users.length} </p>`)
            $('#favoritedDecks').append(`<p> ${users.length + 1} </p>`)

            var unique = _.uniqBy(users, 'deck_name')
            var pluck = unique.map(function(deck) {
                return _.get(deck, 'deck_name')
            });
            unique.forEach(function(deck) {
                if (`${deck.deck_name}` === 'null') {
                    $('.userDecks').append(`<section class = "noDeck"><div class = "deckcontainer"><h2>NO DECKS</h2></div></section>`);
                } else {
                    $('.userDecks').append(`<div class = "deckcontainer"><ul><li><a href="/study.html?email=${myEmail}?deck_id=${deck.deck_id}"</a> ${deck.deck_name} <data-id= ${deck.deck_id}></li
                    </li></ul></div>`);
                }
            });

            //  <--BADGES-->
            $('.userDecks').append(`<div class = "dashboardEmail"><center><h2>Badge Area</h2></center></div>`)
            if (users[0].fiveDeckBadge >= 5) {
                $('.badgeArea').append('<img src="../img/badges/5deckbadge.png">' + '<img src="../img/badges/loginbadge.png">' + '<img src = "../img/badges/adultingbadge.png" height = "80%" width= "80%">');
            } else if (users[0].perfectScore >= 1) {
                $('.badgeArea').append('<img src="../img/badges/perfectscorebadge.png">');
            } else if (users[0].fiveFavorites <= 3) {
                $('.badgeArea').append('<img src="../img/badges/5likebadge.png">');
            } else {
                $('.badgeArea').append('<img src="../img/badges/loginbadge.png">' + '<img src="../img/badges/nocommentbadge.png">');
            }

        });

        // <favorite stats>
        $.ajax({
            method: 'GET',
            url: `https://rhinocards.herokuapp.com/favorite`,
            contentType: "application/json",
            data: JSON.stringify()
        }).then(function(favorite) {
          console.log(favorite.Object)
            // var myNewArray = $(favorite[0].username_email).filter(function(n, i) {
            //   console.log('0129u3')
            //     return (n === myEmail);
            //
            // });
            // console.log = myNewArray

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



    };

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
    $('#logout').on("click", "a", function() {
        window.location = `https://rhinocards.herokuapp.com/logout`
    });

});
