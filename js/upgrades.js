var upgradeTemplate = {
  cost: 10, // a number that's not crazy
  name: "something funny",
  description: "something descriptive and funny",
  type: "powerup/tool",
  upgrade: function (gameData) {
    //do something fun
  }, 
  displayed: false
}

var upgrades = [ 
  {
    cost: 10,
    name: "Click 2: re-clickening",
    description: "Clicking is more powerful, click power  +1",
    type: "powerup",
    upgrade: function (gameData) {
      gameData.clickBonus = gameData.clickBonus + 1;
    }
  },
  {
    cost: 25,
    name: "Auto-Clicker",
    description: "Clicks once a second for you",
    type: "tool",
    upgrade: function (gameData) {
      gameData.autoClickers += 1;
    }
  }
]


function displayUpgrades (gameData) {
  for (var i = 0; i < upgrades.length; i++) {
    var upgrade = upgrades[i];
    if (!upgrade.disabled) { 
      if (gameData.upgrades[i] !== true && upgrade.cost <= gameData.historicScore) {
        addUpgrade(i, upgrade.name, upgrade.cost, upgrade.description, upgrade.type)
        gameData.upgrades[i] = true;
      }
    }
  }
}

function purchaseUpgrade (upgradeId, removeScore, gameData) {
  upgradeId = parseInt(upgradeId);
  if (!isNaN(upgradeId) && gameData.score >= upgrades[upgradeId].cost) {
    removeScore(upgrades[upgradeId].cost);
    upgrades[upgradeId].upgrade(gameData);
    $(`#${upgradeId}`).remove();
    if (gameData.upgradeSnark.id === upgradeId) {
      beSnarky(gameData.upgradeSnark.snark);
    }
  } else {
    gameData.scoreClicks++;
  }
}

function addUpgrade (id, name, cost, description, type) {
  $(`<p class="${type}" id="${id}">
       Name: ${name}<br>
       Cost: ${cost} <br>
       Description: ${description} <br>
     </p>`).appendTo('#upgrades');
}