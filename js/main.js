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
      message.show();
      beSnarky(`Sigh, yeah, this is a clicker game, so, i guess, do your thing.`);
      firstClick = dord;
    }
  }

  function beSnarky (snark) {
    $(`<div>${snark}</div>`).appendTo('#message');
  }

  function noClickFiveMins () {
    if (clicks === 0) {
      message.show();
      beSnarky('This is a game about clicking so... get on with it.');
      setTimeout(noClickTenMins, 300000);
    }
  }

  function noClickTenMins () {
    if (clicks === 0) {
      message.show();
      beSnarky('You keep forgetting to click.');
      setTimeout(noClickFifteenMins, 300000);
    }
  }

  function noClickFifteenMins () {
    if (clicks === 0) {
      message.show();
      beSnarky('Look, can you, just?');
      setTimeout(noClickTwentyMins, 300000);
    }
  }

  function noClickTwentyMins () {
    if (clicks === 0) {
      message.show();
      beSnarky('Ffs, just click okay?');
      setTimeout(noClickFinal, 300000);
    }
  }

  function noClickFinal () {
    setTimeout(function () {
      beSnarky('Okay');
      setTimeout(function () {
        beSnarky('I see.');
        setTimeout(function () {
          beSnarky('I see how it is.');
          setTimeout(function () {
            beSnarky('Well.');
            setTimeout(function () {
              beSnarky('You\'re clearly not getting this so, i guess i\'ll just, sort of.');
              setTimeout(function () {
                beSnarky('Well done on your firstclick, that you totally did legitimately on your own!');
                setTimeout(function () { clicks++; }, 1000);
              }, 2000);
            }, 650);
          }, 100);
        }, 180);
      }, 90);
    }, 80);   
  }

  $(document).ready(function(){
  //register click handlers after dom is rendered.
    $clicker = $('#clicker');
    $clicker.on('click', click);
    message = $('#message');
    message.hide();
    timeOut = setInterval(updateLabels, 10);
    if (clicks === 0) {
      setTimeout(noClickFiveMins, 300000);
      //set to 300000 when testing is finished
    };
  });

})()

