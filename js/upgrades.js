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
    cost: 23,
    name: "Auto-Clicker",
    description: "Clicks once a second for you",
    type: "tool",
    upgrade: function (gameData) {
      gameData.autoClickers += 1;
      gameData.tools++;
    },
    isEnabled: function (gameData) {
      return true;
    },
    snark: "God damn, it feels good not to click anymore, r-right? Well... maybe... j-just a <em>few more</em> clicks"
  },
  {
    cost: 900,
    name: "Click 2: re-clickening",
    description: "Clicking is more powerful, click power  +1",
    type: "powerup",
    upgrade: function (gameData) {
      gameData.clickBonus = gameData.clickBonus + 1;
      gameData.powerups++;
    },
    isEnabled: function (gameData) {
      return true;
    },
    snark: "Yeah i guess that's probably a good purchase tbh"
  },
  {
    cost: 1539,
    name: "The Oddening",
    description: "Odd clicks are worth +3.",
    type: "powerup",
    upgrade: function (gameData) {
      gameData.oddClicks = true;
      gameData.powerups++;
    },
    isEnabled: function (gameData) {
      return true;
    },
    snark: "I..i really don't know if this is... worth it?"
  },
  {
    cost: 600,
    name: "Auto-Clicker x2",
    description: "Clicks once a second for you",
    type: "tool",
    upgrade: function (gameData) {
      gameData.autoClickers += 1;
      gameData.tools++;
    },
    isEnabled: function (gameData) {
      return gameData.autoClickers > 0;
    },
    snark: "Holy shit this costs so much more than the last one what gives???"
  }
]


function displayUpgrades (gameData) {
  for (var i = 0; i < upgrades.length; i++) {
    var upgrade = upgrades[i];
    if (upgrade.isEnabled(gameData)) {
      if (gameData.upgrades[upgrade.name] !== true) {
        addUpgrade(i, upgrade.name, upgrade.cost, upgrade.description, upgrade.type)
        gameData.upgrades[upgrade.name] = true;
      }
    }
  }
}

function purchaseUpgrade (upgradeId, removeScore, gameData) {
  upgradeId = parseInt(upgradeId);
  var upgrade = upgrades[upgradeId];
  if (!isNaN(upgradeId) && gameData.score >= upgrade.cost) {
    removeScore(upgrade.cost);
    upgrade.upgrade(gameData);
    $(`#${upgradeId}`).remove();
    upgradeToast(upgrade.snark)
    upgradeToast(`Purchased ${upgrade.name}`)
    if (gameData.upgradeSnark.id === upgradeId) {
      upgradeToast(gameData.upgradeSnark.snark);
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