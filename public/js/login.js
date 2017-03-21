$('.login-form__submit').on('click', function(e){
  e.preventDefault();
  console.log('it worls')
 window.location =  `/dashboard.html?email=${'Jeff@gmail.com'}`

})
