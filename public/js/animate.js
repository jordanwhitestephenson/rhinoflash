/*global $ window*/

const img = $('#dino');
const width = img.get(0).width;
const screenWidth = $(window).width();
const dino = ['../img/rhinoGif/rhino1.gif', '../img/rhinoGif/rhino2.gif',
  '../img/rhinoGif/rhino3.gif', '../img/rhinoGif/rhino4.gif',
  '../img/rhinoGif/rhino5.gif', '../img/rhinoGif/rhino6.gif',
  '../img/rhinoGif/rhino7.gif', '../img/rhinoGif/rhino8.gif'];
let duration = 1700;
let margin;
let dinoNumber;

function generateRandom() {
  const num = Math.floor(Math.random() * 580);
  return num;
}


$('.stampede').click(() => {
  console.log(dino[1]);
    for (let i = 0; i < 75; i++) {
      setTimeout(() => {
        margin = generateRandom();
        duration = (Math.floor(Math.random() * 15000)) + 15000;
        dinoNumber = (Math.floor(Math.random() * 8))
        console.log(duration);
        let img = $('<img id=dino class=dinosaur'+i+'>');
        img.attr('src', 'Images/'+dino[dinoNumber]);
        img.attr('height', '100px');
        img.attr('left', '-2500px');
        img.appendTo('.myRhino');
        $('.dinosaur'+i).css({
          'margin-top': `${margin}px`,
        });
        img.css('left', (-width-120)).animate({
          left: screenWidth+2000,
          bottom: '+=70'
        }, duration);
      }, Math.floor(Math.random() * 70)*i*3);
    }
  $('.myRhino').empty();
});
