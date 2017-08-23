(function(){
  var $clicker;
  var clicks = 0;
  var timeOut;
  var message;



  function click () {
    clicks++;
  }

  function updateLabels() {
    checkClicks();
  }

  function checkClicks() {
    firstClick();
  }

  function dord () {
    return;
  }

  function firstClick() {
    if (clicks) { 
      $('#message').show();
    }
    firstClick = dord;
  }

  $(document).ready(function(){
  //register click handlers after dom is rendered.
    $clicker = $('#clicker');
    $clicker.on('click', click);
    $('#message').hide();
    timeOut = setInterval(updateLabels, 10);
  });
  
})()

