var myEmail = decodeURIComponent(window.location.search).split("=")[1];
console.log(myEmail);
$(document).ready(function() {

    $('#showDeckClass').on('click', function() {
        window.location = `/showStudyClassecks.html?email=${myEmail}`
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

    $.getJSON("https://spreadsheets.google.com/feeds/list/1drpkpwOh-omRcTLbr1EycVLNLBpvY5AySulIYdk9MKk/od6/public/values?alt=json", function(data) {
        vocabWords = data.feed.entry;
        numVocabWords = vocabWords.length;
    });
    // var flashcard = document.getElementById('flashcard');
    // var refreshBtns = document.getElementsByClassName('refresh');
    //
    // $(document).on('click', '#flashcard', function(event) {
    //     event.preventDefault();
    //     console.log('flipped from play.js')
    //     this.classList.toggle('flipped');
    // });
});
    // window.addEventListener('keydown', checkKeyPressed, false);

    // function checkKeyPressed(e) {
    //     if (e.keyCode == "39") {
    //         this.classList.toggle('flipped');
    //     }
    // }

    // left and right - next and previous card
    // up and down - flip card
    // space or enter - star card

    // left = 37
    // up = 38
    // right = 39
    // down = 40
    // spaceBar: 32

//     for (i = 0; i < refreshBtns.length; i++) {
//         refreshBtns[i].addEventListener('click', function(e) {
//             e.stopPropagation();
//             e.preventDefault();
//             var randomNum = getRandomInt(0, numVocabWords);
//             newWord = vocabWords[randomNum];
//             var enContent = document.getElementById('flashcard--content_en');
//             var esContent = document.getElementById('flashcard--content_es');
//             enContent.textContent = newWord.gsx$en.$t;
//             esContent.textContent = newWord.gsx$es.$t;
//         }, false);
//     }
//
//     function getRandomInt(min, max) {
//         return Math.floor(Math.random() * (max - min)) + min;
//     }
// })

// ***PREV NEXT BUTTONS***


// ***JSON DATA***

// var vocabulary = [{
// 	"en": "beer",
// 	"es": "la cerveza"
// }, {
// 	"en": "biscuit",
// 	"es": "la galleta"
// }, {
// 	"en": "bonbon",
// 	"es": "el bombón"
// }, {
// 	"en": "brandy",
// 	"es": "el aguardiente"
// }, {
// 	"en": "bratwurst",
// 	"es": "la salchicha"
// }, {
// 	"en": "bread",
// 	"es": "el pan"
// }, {
// 	"en": "bun",
// 	"es": "el panecillo"
// }, {
// 	"en": "butter",
// 	"es": "la mantequilla"
// }, {
// 	"en": "cake",
// 	"es": "el bollo"
// }, {
// 	"en": "can, tin",
// 	"es": "la conserva"
// }, {
// 	"en": "champagne",
// 	"es": "el champán"
// }, {
// 	"en": "cheese",
// 	"es": "el queso"
// }, {
// 	"en": "chocolate",
// 	"es": "el chocolate"
// }, {
// 	"en": "cider",
// 	"es": "la sidra"
// }, {
// 	"en": "cinnamon",
// 	"es": "la canela"
// }, {
// 	"en": "cocoa",
// 	"es": "el cacao"
// }, {
// 	"en": "coffee",
// 	"es": "el café"
// }, {
// 	"en": "cream",
// 	"es": "la nata"
// }, {
// 	"en": "egg",
// 	"es": "el huevo"
// }, {
// 	"en": "fish",
// 	"es": "el pescado"
// }, {
// 	"en": "flour",
// 	"es": "la harina"
// }, {
// 	"en": "ham",
// 	"es": "el jamón"
// }, {
// 	"en": "honey",
// 	"es": "la miel"
// }, {
// 	"en": "ice cream",
// 	"es": "el helado"
// }, {
// 	"en": "juice",
// 	"es": "el zumo"
// }, {
// 	"en": "kefir",
// 	"es": "el kéfir"
// }, {
// 	"en": "margarine",
// 	"es": "la margarina"
// }, {
// 	"en": "meat",
// 	"es": "la carne"
// }, {
// 	"en": "milk",
// 	"es": "la leche"
// }, {
// 	"en": "milk powder",
// 	"es": "la leche en polvo"
// }, {
// 	"en": "mineral water",
// 	"es": "el agua mineral"
// }, {
// 	"en": "mustard",
// 	"es": "la mostaza"
// }, {
// 	"en": "olive oil",
// 	"es": "el aceite de oliva"
// }, {
// 	"en": "pepper",
// 	"es": "la pimienta"
// }, {
// 	"en": "raisin",
// 	"es": "la uva pasa"
// }, {
// 	"en": "rice",
// 	"es": "el arroz"
// }, {
// 	"en": "salt",
// 	"es": "la sal"
// }, {
// 	"en": "sausage",
// 	"es": "el chorizo"
// }, {
// 	"en": "soft drink",
// 	"es": "el refresco"
// }, {
// 	"en": "spice",
// 	"es": "la especia"
// }, {
// 	"en": "sugar",
// 	"es": "el azúcar"
// }, {
// 	"en": "tea",
// 	"es": "el té"
// }, {
// 	"en": "vinegar",
// 	"es": "el vinagre"
// }, {
// 	"en": "water",
// 	"es": "el agua"
// }, {
// 	"en": "wine",
// 	"es": "el vino"
// }, {
// 	"en": "yoghurt",
// 	"es": "el yogurt"
// }];
// var numDictionaryItems = vocabulary.length;
