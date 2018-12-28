const setupModal = function (domElements) {
  document.getElementById("close").onclick = () => {
    domElements.modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == domElements.modal) {
      domElements.modal.style.display = "none";
    }
  };
};

// Initiate
(function () {

  let gameState = {
    clicks: 0,
    score: 0,
    bonus: 0,
    multiplier: 0,
    tools: {
      Termites: {
        baseCost: 15,
        cost: 15,
        exponent: 1.14,
        power: 0.1
      },
      Dwarves: {
        baseCost: 120,
        cost: 120,
        exponent: 1.14,
        power: 2
      },
      FloatingAxes: {
        baseCost: 1207,
        cost: 1207,
        exponent: 1.14,
        power: 5
      },
      LumberJohns: {
        baseCost: 17001,
        cost: 17001,
        exponent: 1.15,
        power: 13
      },
      ZombieWoodpeckers: {
        baseCost: 290123,
        cost: 290123,
        exponent: 1.15,
        power: 50,
      },
      MaliciousIcicles: {
        baseCost: 1232326,
        cost: 1232326,
        exponent: 1.15,
        power: 120
      },
      BenevolentWitches: {
        baseCost: 10204060,
        cost: 10204060,
        exponent: 1.16,
        power: 500
      },
      ChainsawSloths: {
        baseCost: 300000000,
        cost: 300000000,
        exponent: 1.16,
        power: 1200
      }
    }
  };

  const domElements = {
    modal: document.getElementById('modal'),
    score: document.getElementById('counter'),
    scorePerSecond: document.getElementById('scorepersecond'),
    toolsBox: document.getElementById('toolsBox'),
    Termites: document.getElementById('termites'),
    Dwarves: document.getElementById('dwarves'),
    FloatingAxes: document.getElementById('floatingaxes'),
    LumberJohns: document.getElementById('lumberjohns'),
    ZombieWoodpeckers: document.getElementById('zombiewoodpeckers'),
    MaliciousIcicles: document.getElementById('maliciousicicles'),
    BenevolentWitches: document.getElementById('benevolentwitches'),
    ChainsawSloths: document.getElementById('chainsawsloths'),
    instruction: document.getElementById('instruction')
  };

  const incrementClicks = function (clicks, state) {
    state.clicks += clicks;
  };

  const incrementScore = function (score, state) {
    const bonus = state.bonus || 0;
    const multiplier = state.multiplier || 1;
    const increment = (score * multiplier) + bonus;
    state.score = addDecimals(state.score, increment);
    updateScoreLabel(state.score);
  };

  const decrementScore = function (score, state) {
    state.score = minusDecimals(state.score, score);
    updateScoreLabel(state.score);
  }

  const incrementScoreByTools = function (stateTools) {
    let increment = 0;
    Object.keys(tools).forEach(key => {
      tool = stateTools[key];
      if (tool.purchased > 0) {
        let toolIncrement = timesDecimals(tool.purchased, tool.power);
        increment = addDecimals(toolIncrement, increment);
      }
    });

    if (increment > 0) {
      incrementScore(increment, gameState);
      updateScorePerSecondLabel(increment);
    }
  };

  document.getElementById('clicker').onclick = () => {
    incrementClicks(1, gameState);
    incrementScore(1, gameState);
  }; // setup click handler for the click button

  const showModal = function () {
    domElements.modal.style.display = "block";
  };

  const updateScoreLabel = function (score) {
    domElements.score.innerText = score;
  };

  const updateScorePerSecondLabel = function (scorePerSecond) {
    domElements.scorePerSecond.innerText = `${scorePerSecond} logs/s`;
  }

  const addDecimals = function (num1, num2) {
    return Math.round(num1 * 100 + num2 * 100) / 100;
  };

  const minusDecimals = function (num1, num2) {
    return Math.round(num1 * 100 - num2 * 100) / 100;
  }

  const timesDecimals = function (num1, num2) {
    return (num1 * num2).toFixed(1);
  };

  const displayTool = function (domElement, name, state) {
    const tool = state.tools[name];
    domElement.className = 'tool'
    domElement.innerHTML =
      `${tools[name].name}<br>`+
      `<span id="num${name}">Owned: ${tool.purchased}<\/span><br>` +
      `<span id="${name}Cost">Price: ${tool.cost}<\/span><br>`+
      `<span id="${name}Power">Logs/s: ${tool.power}<\/span><br>` +
      `<p>${tools[name].description}<\/p>`;

    domElement.onclick = function () {
      if (state.score >= tool.cost) {
        tool.purchased += 1;
        decrementScore(tool.cost, state);
        tool.cost = calculateCost(tool.baseCost, tool.purchased, tool.exponent);
        document.getElementById(`${name}Cost`).innerText = `Price: ${tool.cost}`;
        document.getElementById(`num${name}`).innerText = `Owned: ${tool.purchased}`;
      }
    }
  }

  const calculateCost = function (baseCost, amount, exponent) {
    const power = Math.pow(exponent, amount);
    return timesDecimals(baseCost, power);
  }

  const updateTool = function (state, name, domElement) {
    if (state.tools[name].purchased === undefined && tools[name].enabled(state)) {
      gameState.tools[name].purchased = 0;
      displayTool(domElement, name, state);
      if (name === 'Termites') {
        domElements.toolsBox.className = 'top tools'
      }
    }
  }

  const update = function () {
    // regular update logic goes here.
    Object.keys(tools).forEach(key => {
      updateTool(gameState, key, domElements[key]);
    });
    incrementScoreByTools(gameState.tools);
    gameSave(gameState);
  };

  const startLoop = function () {
    let interval = 1000; // ms
    let expected = Date.now() + interval;
    setTimeout(step, interval);
    function step() {
      const dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
        expected = Date.now() + interval;
        dord();
      } else {
        expected += interval;
      }

      // Call game functions
      update();
      setTimeout(step, Math.max(0, interval - dt));
    }
  };

  const ninetyPercent = function (name) {
    const tenPercent = (gameState.tools[name].baseCost/100)*10;
    return gameState.tools[name].baseCost - tenPercent;
  };

  const tools = {
    Termites: {
      name: 'Termites',
      description: "A fresh pack of bugs to help you cut down trees.",
      enabled: (state) => state.clicks >= 3
    },
    Dwarves: {
      name: 'Dwarves',
      description: "These short men really hate trees, you're not sure why but they are hard workers.",
      enabled: (state) => state.score > ninetyPercent('Dwarves')
    },
    FloatingAxes: {
      name: 'Floating axes',
      description: "None of the dwarves will use these ominous black axes, but no matter, they'll just use themselves.",
      enabled: (state) => state.score > ninetyPercent('FloatingAxes')
    }, LumberJohns: {
      name: 'Lumber johns',
      description: "These big burly men wearing plaid attack the trees with their claw like hands, they're honestly really intense and make you a little uncomfortable.",
      enabled: (state) => state.score > ninetyPercent('LumberJohns')
    }, ZombieWoodpeckers: {
      name: 'Zombie Woodpeckers',
      description: "Fallen tree dwellers have risen to join your fight, they cut trees down with their vicious pecks.",
      enabled: (state) => state.score > ninetyPercent('ZombieWoodpeckers'),
    }, MaliciousIcicles: {
      name: "Malicious Icicles",
      description: "It's not readily apparent why, but the icicles that form in the area will fall into trees and deal significant damage.",
      enabled: (state) => state.score > ninetyPercent('MaliciousIcicles'),
    }, BenevolentWitches: {
      name: "Benevolent Witches",
      description: "Kids keep coming into the woods with cameras and drawing these witches out, they seem interested in joining the fight against the tree hordes.",
      enabled: (state) => state.score > ninetyPercent('BenevolentWitches')
    }, ChainsawSloths: {
      name: "Chainsaw Sloths",
      description: "You wouldn't expect that something so slow would be so efficient at cutting down trees, the chainsaws definitely help.",
      enabled: (state) => state.score > ninetyPercent('ChainsawSloths')
    }
  };

  setupModal(domElements);
  showModal();
  
  if (getCookie('gameData')) {
    gameState = gameLoad();

    if (gameState.score >= 3) {
      domElements.toolsBox.className = 'top tools';
    };

    Object.keys(gameState.tools).forEach(key => {
      if (gameState.tools[key].purchased !== undefined) {
        domElements.toolsBox.className = 'top tools';
        displayTool(domElements[key], key, gameState);
      }
    });
  };

  startLoop();
})();
