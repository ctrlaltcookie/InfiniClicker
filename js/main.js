(function () {
  var $clicker;
  var screenUpdateTimeout;
  var autoSaveInterval;
  var $message;
  var $counter;
  var oneSecondInterval;
  var gameData = {
    clicks: 0,
    historicScore: 0,
    score: 0,
    autoSave: false,
    clickBonus: 0,
    scoreClicks: 0,
    upgradeSnark: {
      id: undefined, 
      snark: undefined
    },
    upgrades: {},
    autoClickers: 0,
    tools: 0,
    powerups: 0,
    oddClicks: false
  };

  function removeScore (cost) {
    gameData.score -= cost;
  }

  function incrementClicks () {
    gameData.clicks++;
    if (gameData.oddClicks && gameData.clicks % 2) {
      gameData.score += 3;
    }
    gameData.score += (1 + gameData.clickBonus);
    gameData.historicScore += (1 + gameData.clickBonus)
  }

  function upgradeSnark(id, text, gameData) {
    gameData.upgradeSnark = { id: id, snark: text };
  }

  function click () {
    incrementClicks();
    triggerSnark(gameData, upgradeSnark);
  }

  function autoClick () {
    if (gameData.autoClickers) {
      for (var i = 0; i < gameData.autoClickers; i++) {
        click();
      }
    }
  }

  function updateLabels () {
    checkClicks();
    displayUpgrades(gameData);
    $counter.text(`Score: ${gameData.score}`);
  }

  function checkClicks () {
    firstClick();
  }

  function firstClick () {
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

  $(document).ready(function () {
  //register click handlers after dom is rendered.
    //special function to grab all upgrades!!
    $(document).on('click', 'p', function (e) {
      purchaseUpgrade(e.target.id, removeScore, gameData);
      triggerSnark(gameData);
    });

    $clicker = $('#clicker');
    $counter = $('#counter');
    $clicker.on('click', click);
    $message = $('#message');
    $message.hide();

    screenUpdateTimeout = setInterval(updateLabels, 10);

    oneSecondInterval = setInterval(autoClick, 1000);
    
    try {
      gameData = gameLoad();
    } catch (ex) {
      console.log("looks like you have no game data! this might be an error, contact @therickest_ on twatter");
    }
    if (gameData.clicks === 0) {
      setTimeout(noClickFiveMins, 300000);
    };

    if (gameData.autoSave) {
      autoSaveInterval = setInterval(autoSave, 30000);
    }

  });

})();
