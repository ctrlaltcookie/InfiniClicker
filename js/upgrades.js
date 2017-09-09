var upgrades = [
  {
    cost: 10,
    name: "Click 2: re-clickening",
    description: "Clicking is more powerful, click power +1",
    type: "tool",
    upgrade: function (gameData) {
      gameData.clickBonus += 1;
    }, 
    displayed: false
  }
]


function displayUpgrades (score) {
  for (var i = 0; i < upgrades.length; i++) {
    var upgrade = upgrades[i];
    if (upgrade.cost <= score && !upgrade.displayed) {
      addUpgrade(i, upgrade.name, upgrade.cost, upgrade.description, upgrade.type)
      upgrade.displayed = true;
    }
  }
}

function purchaseUpgrade (upgradeId, removeScore, gameData) {
  upgradeId = parseInt(upgradeId);
  if (gameData.score >= upgrades[upgradeId].cost) {
    removeScore(upgrades[upgradeId].cost);
    upgrades[upgradeId].upgrade(gameData);
    $(`#${upgradeId}`).remove();
  }
}

function addUpgrade (id, name, cost, description, type) {
    $(`<p class="${type}" id="${id}">
      Name: ${name}<br>
      Cost: ${cost} <br>
      Description: ${description} <br>
    </p>`).appendTo('#upgrades');
}