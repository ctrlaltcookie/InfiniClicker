var scoreTarget = [
  {
    name: 'leet',
    message: 'ur s0 l33t',
    req: 1337
  },
  {
    name: 'reverse consecutive',
    message: `Double holy shit fuck, your score is exactly reverse consecutive, that's crazy! score x1000`,
    req: 987654321,
    trigger: function (gameData) {
      gameData.score = gameData.score * 1000;
    }
  },
  {
    name: 'consecutive',
    message: 'Holy shit your score is exactly consecutive!, score x1000',
    req: 123456789,
    trigger: function (gameData) {
      gameData.score = gameData.score * 1000;
    }
  },
  {
    name: 'boobs',
    message: `Lmao you're score is boobs`,
    req: 80085
  },
  {
    name: 'shit',
    message: `Shhiiitttt your score is totally shit, score -5417, that'll fuggin teach`,
    req: 5417,
    trigger: function (gameData) {
      gameData.score = 0;
    }
  },
  {
    name: 'lost',
    message: `This show sucks, here's your reward for being so unlucky as to land on this number; score -999999`,
    req: 4815162342,
    trigger: function (gameData) {
      gameData.score -= 999999;
    }
  },
  {
    name: 'bewbless',
    message: `I know how this feels, hope this helps you feel better.`,
    req: 55378008,
    trigger: function (gameData) {
      beSnarky('EXTRAVAGENT GIFT INCOMING');
      gameData.score = gameData.score * gameData.score;
    }
  }
]

function triggerSnark(gameData, upgradeSnark) {
  if (gameData.historicScore === 15 && gameData.clickBonus < 1) {
    beSnarky('Haha noob, click on the upgrade to buy it');
    upgradeSnark(0, 'Acheevemunt get: following <a href="https://www.youtube.com/watch?v=2-bbYH_akHg" target="_blank">ordahs</a>', gameData);
  }
  if (gameData.historicScore === 2000 && gameData.autoClickers) {
    beSnarky('<strong>slow clap</strong> You clicked a lot to get here but uhh');
  }

  currentScoreSnarks();
  clickScoreSnark();
};

function beSnarky (snark) {
  $(`<div>${snark}</div>`).appendTo('#message');
  scroll();
}

function clickScoreSnark(gameData) {
  var click10 = clickscore10snark(gameData);
  var click150 = clickscore150snark(gameData);
  var click300 = clickscore300snark(gameData);

  if(click10 && click150 && click300) {
    clickScoreSnark = dord;
  }
}

function currentScoreSnarks(gameData) {
  // 667();
  // 668();
  // 42();
  // potential future snarks;

  var newArray  = scoreTarget.filter(function(item){
    return gameData.score < item.req;
  });

  scoreTarget = newArray;

  for (var k = 0; k < scoreTarget.length; k++) {
    if (gameData.score === scoreTarget[i].req) {
      beSnarky(scoreTarget[i].message);
      if (scoreTarget[i].trigger) {
        scoreTarget[i].trigger();
      }
    }
  }
}


function clickscore10snark (gameData) {
  if (gameData.scoreClicks === 10) {
    beSnarky('That\'s the score dumbass, the click button <em>couldn\'t</em> be closer');
    score10snark = dord;
    return true;
  }
  return false;
}

function clickscore150snark (gameData) {
  if (gameData.scoreClicks === 150) {
    beSnarky(`Archivetent get: doing sommething pointless.`);
    clickscore150snark = dord;
    return true;
  }
  return false;
}

function clickscore300snark (gameData) {
  if (gameData.scoreClicks === 300) {
    beSnarky(`Oh, wow, seriously? you really clicked that many times? That is <strong>amazing</strong>, good job, seriously, h-here, take some score bonuses: score x50`);
    gameData.score = gameData.score * 50;
    gameData.historicScore = gameData.historicScore * 50;
    gameData.scoreClicks = gameData.scoreClicks * 50;
    clickscore300snark = dord;
    return true;
  }
  return false;
}
