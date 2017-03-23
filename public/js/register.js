$.ajaxSetup({xhrFields: { withCredentials: true } });

$(function() {
  $('.register-button').on('click', function(event) {
    event.preventDefault();
    var userName = $('.name-field').val();
    var userEmail = $('.email-field').val();
    var image = Math.floor(Math.random() * 7);
    var newUser = {name: userName, email: userEmail, userImage: image};
    $.post('https://rhinocards.herokuapp.com/username', newUser)
      .then(function(data, status) {
        console.log(data);
      })
      .catch(function(error) {
        console.log(error);
      })
      window.location.href = 'https://rhinocards.herokuapp.com/login';
  })
})
