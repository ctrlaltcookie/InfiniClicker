(function(){
  var $clicker;
  var screenUpdateTimeout;
  var autoSaveInterval;
  var $message;
  var $counter;
  var gameData = {
    clicks: 0,
    score: 0,
    autoSave: false
  };

  function incrementClicks() {
    gameData.clicks++;
    gameData.score++;
  }

  function click () {
    incrementClicks();
    triggerSnark(gameData.clicks);
  }

  function updateLabels() {
    checkClicks();
    displayUpgrades();
    $counter.text(gameData.score);
  }

  function checkClicks() {
    firstClick();
  }

  function dord () {
    return;
  }

  function firstClick() {
    if (gameData.clicks) { 
      $message.show();
      beSnarky(`Sigh, yeah, this is a clicker game, so, i guess, do your thing.`);
      firstClick = dord;
    }
  }

  function noClickFiveMins () {
    if (gameData.clicks === 0) {
      $message.show();
      beSnarky('This is a game about clicking so... get on with it.');
      setTimeout(noClickTenMins, 300000);
    }
  }

  function noClickTenMins () {
    if (gameData.clicks === 0) {
      $message.show();
      beSnarky('You keep forgetting to click.');
      setTimeout(noClickFifteenMins, 300000);
    }
  }

  function noClickFifteenMins () {
    if (gameData.clicks === 0) {
      $message.show();
      beSnarky('Look, can you, just?');
      setTimeout(noClickTwentyMins, 300000);
    }
  }

  function noClickTwentyMins () {
    if (gameData.clicks === 0) {
      $message.show();
      beSnarky('Ffs, just click okay?');
      setTimeout(noClickFinal, 300000);
    }
  }

  //this is ugly
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
                beSnarky('CLICK');
                setTimeout(function () {
                  beSnarky('Well done on your firstclick, that you totally did legitimately on your own!');
                  setTimeout(function () { 
                    click();
                  }, 1000);
                }, 1300);
              }, 100);
            }, 1400);
          }, 100);
        }, 500);
      }, 200);
    }, 100);   
  }

  function autoSave () {
    gameSave(gameData);
  }

  $(document).ready(function(){
  //register click handlers after dom is rendered.
    $clicker = $('#clicker');
    $counter = $('#counter');
    $clicker.on('click', click);
    $message = $('#message');
    $message.hide();

    screenUpdateTimeout = setInterval(updateLabels, 10);
    
    gameData = gameLoad();

    if (gameData.clicks === 0) {
      setTimeout(noClickFiveMins, 300000);
    };

    if (gameData.autoSave) {
      autoSaveInterval = setInterval(autoSave, 30000);
    }

  });

})();
