function triggerSnark(gameData, upgradeSnark) {
  if (gameData.historicScore === 15 && gameData.clickBonus < 1) {
    beSnarky('Haha noob, click on the upgrade to buy it');
    upgradeSnark(0, 'Acheevemunt get: following <a href="https://www.youtube.com/watch?v=2-bbYH_akHg" target="_blank">ordahs</a>', gameData);
  }
  if (gameData.scoreClicks === 10) {
    beSnarky('That\'s the score dumbass, the click button couldn\'t be closer');
  }
  if (gameData.scoreClicks === 150) {
    beSnarky(`Archivetent get: doing sommething pointless.`);
  }
  if (gameData.scoreClicks === 300) {
    beSnarky(`Oh, wow, seriously? you really clicked that many times? That is <strong>amazing</strong>, good job, seriously, h-here, take some score bonuses: score x50`);
    gameData.score = gameData.score * 50;
    gameData.historicScore = gameData.historicScore * 50;
  }
};

function beSnarky (snark) {
  $(`<div>${snark}</div>`).appendTo('#message');
  scroll();
}