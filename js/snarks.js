function triggerSnark(gameData, upgradeSnark) {
  if (gameData.historicScore === 15 && gameData.clickBonus < 1) {
    beSnarky('Haha noob, buy the upgrade');
    upgradeSnark(0, 'Acheevemunt get: following <a href="https://www.youtube.com/watch?v=2-bbYH_akHg" target="_blank">ordahs</a>', gameData);
  }
};

function beSnarky (snark) {
  $(`<div>${snark}</div>`).appendTo('#message');
  scroll();
}