$(document).ready( function() {

  $('body').on("click", ".larg div h3", function(){
    if ($(this).children('span').hasClass('close')) {
      $(this).children('span').removeClass('close');
    }
    else {
      $(this).children('span').addClass('close');
    }
    $(this).parent().children('p').slideToggle(250);
  });

  $('body').on("click", "nav ul li a", function(){
    var title = $(this).data('title');
    var body = $(this).data('body')
    var heading = $(this).data('heading')
    var about = $(this).data('about')
    var userbio = $(this).data('userbio')
    var makeCards = $(this).data('makecards')
    var userStats = $(this).data('userstats')
    var statOverview = $(this).data('statoverview')

    $('.title').children('h2').html(title);
    $('.div1').children('p').html(body);
    $('.div1').children('h3').html(heading);
    $('.div2').children('h3').html(about);
    $('.div2').children('p').html(userbio);
    $('.div2').children('p').html(makeCards);
    $('.div3').children('h3').html(statOverview)
    $('.div3').children('p').html(userStats)
  });
});
