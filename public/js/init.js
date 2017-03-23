$.ajaxSetup({xhrFields: { withCredentials: true } });
$.get('https://rhinocards.herokuapp.com/')
  .then(function(req, res) {
    if (req.user === undefined) {
      window.location.href = 'https://flashrhino.com';
    }
  })
  .catch(function(error) {
    console.log(error);
  })
(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space
