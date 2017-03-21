

$(document).ready(function() {
  var myEmail = decodeURIComponent(window.location.search).split("=")[1];
  console.log(myEmail)

    $('body').on("click", ".larg div h3", function() {
        $(this).parent().children('p').slideToggle(250)
    });


    $('#member').on("click", "a", function() {
        $.ajax({
            method: 'GET',
            url: `https://flash-backend.herokuapp.com/username/${'myEmail'}`,
            contentType: "application/json",
            data: JSON.stringify()
        }).then(function(users) {
            console.log(users)
            $('.div1 h3').text('Welcome : ' + users.name + ' !');
            $('.userDecks h3').text(users.name + "'s" + 'Decks : ' )


            for (var i = 0; i < users.length; i ++) {
              var userDeck = users.deck_name;
              $('.userDecks p').html(`<a href ="userDeck"> * ${userDeck} </a>` + `<a href ="userDeck"> * ${userDeck} </a>`);
            }

            if (users.fiveDeckBadge <= 5){
              $.get('https://flash-backend.herokuapp.com/badge', function(data) {
                   var fivebadgeimg = data[0].pathTo5Badge;
                   $('.badgeArea').append('<img src =' + fivebadgeimg + '>')
               });
            }
            if(users[0].perfectScore <= 1) {
              $.get('https://flash-backend.herokuapp.com/badge', function(data) {
                   var perfectScoreImg = data[0].pathToPerfectBadge;
                   $('.badgeArea').append('<img src =' + perfectScoreImg + '>')
               });

            }
        });





        var title = $(this).data('title');
        var userBadges = $(this).data('userbadge')
        var body = $(this).data('body')
        var heading = $(this).data('heading')
        var about = $(this).data('about')
        var userbio = $(this).data('userbio')
        var userStats = $(this).data('userstats')
        var statOverview = $(this).data('statoverview')

        $('.title').children('h2').append(title);
        $('.div1').children('p').html(body);
        $('.div1').children('h3').html(heading);
        $('.div2').children('h3').html(about);
        $('.div2').children('p').html(userbio);
        $('.div3').children('p').html(userStats)
        $('.div3').children('h3').html(statOverview)
        $('.imageDiv').children('p').html('<img src =' + userBadges + '>')
    })
});
