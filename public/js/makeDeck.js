
$( document ).ready(function() {
    appendSubject()
});


  function appendSubject(){

		$.ajax({
	 		 method: 'GET',
	 		 url: 'https://flash-backend.herokuapp.com/subject',
	 		 contentType: "application/json",
	 		 data: JSON.stringify()
	  }).then(function(subject){
			for (var i = 0; i < subject.length; i++) {
	$('.subject')
	.append('<li class="dropval" id="'+subject[i].name'"><a>'+subject[i].name+'</a></li>');
			}
		})
}


// var selected = document.getElementById('dropdown1')
// console.log(selected);


$('.dropval').click(function(){
	console.log('lll');
	var id = $(this).attr('id');
	console.log(id)
	});



$( "#addCard" ).click(function() {
  front
	back
	deck_id
});

// name
// subject
// ---drop down
// email

$( "#addDeck" ).click(function() {
		$.ajax({
	  type: "POST",
	  url: 'https://flash-backend.herokuapp.com',
	  data: data,

	});
});


// Card: {"front":"history1 front","back":"history1 back","deck_id":1}

// Deck: {"subject":"History","email":"Jeff@gmail.com","front":"history9 front","back":"history9 back","name":"history101","id":1}

// badge, subject, username, deck, favorite, flashcard
