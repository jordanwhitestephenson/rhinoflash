
$(document).ready( function() {


  $('body').on("click", ".larg div h3", function(){
    $(this).parent().children('p').slideToggle(250)
  });

  var badgeimage =
  $('#member').on("click", "a", function(){
    $.ajax({
        method: 'GET',
        url: 'https://flash-backend.herokuapp.com/username',
        contentType: "application/json",
        data: JSON.stringify()
    }).then(function(users) {
        console.log(users)
      $('.div1 h3').text('Welcome : ' + users[0].name + ' !');
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
