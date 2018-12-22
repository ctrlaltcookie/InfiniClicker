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
        cost: 10,
        exponent: 1.22,
        power: 0.1
      },
      Dwarves: {
        cost: 100,
        exponent: 1.21,
        power: 1
      },
      FloatingAxes: {
        cost: 513,
        exponent: 1.24,
        power: 5
      },
      LumberJohns: {
        cost: 1021,
        exponent: 1.27,
        power: 13
      },
      ZombieWoodpeckers: {
        cost: 3184,
        exponent: 1.28,
        power: 50,
      },
      MaliciousIcicles: {
        cost: 12232,
        exponent: 1.12,
        power: 120
      },
      BenevolentWitches: {
        cost: 30100,
        exponent: 1.23,
        power: 500
      },
      ChainsawSloths: {
        cost: 102040,
        exponent: 1.22,
        power: 1200
      }
    }
  };

  const domElements = {
    modal: document.getElementById('modal'),
    score: document.getElementById('counter'),
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

  const addDecimals = function (num1, num2) {
    return Math.round(num1 * 100 + num2 * 100) / 100;
  };

  const minusDecimals = function (num1, num2) {
    return Math.round(num1 * 100 - num2 * 100) / 100;
  }

  const timesDecimals = function (num1, num2) {
    return (num1 * num2).toFixed(1);
  };

  const displayTool = function (domElement, tool, state) {
    domElement.className = 'tool'
    domElement.innerHTML =
      `${tools[tool].name}<br>`+
      `<span id="num${tool}">Owned: ${state.tools[tool].purchased}<\/span><br>` +
      `<span id="${tool}Cost">Price: ${state.tools[tool].cost}<\/span><br>`+
      `<span id="${tool}Power">Logs/s: ${state.tools[tool].power}<\/span><br>` +
      `<p>${tools[tool].description}<\/p>`;

    domElement.onclick = function () {
      if (state.score >= state.tools[tool].cost) {
        state.tools[tool].purchased += 1;
        decrementScore(state.tools[tool].cost, state);
        state.tools[tool].cost = timesDecimals(state.tools[tool].cost, state.tools[tool].exponent);
        document.getElementById(`${tool}Cost`).innerText = `Price: ${state.tools[tool].cost}`;
        document.getElementById(`num${tool}`).innerText = `Owned: ${state.tools[tool].purchased}`;
      }
    }
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
        domElements.instruction.innerText = 'Something went wrong in the game loop, you should reload';
        dord();
      }

      // Call game functions
      update();
      //

      expected += interval;
      setTimeout(step, Math.max(0, interval - dt));
    }
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
      enabled: (state) => state.score > 80
    },
    FloatingAxes: {
      name: 'Floating axes',
      description: "None of the dwarves will use these ominous black axes, but no matter, they'll just use themselves.",
      enabled: (state) => state.score > 427
    }, LumberJohns: {
      name: 'Lumber johns',
      description: "These big burly men wearing plaid attack the trees with their claw like hands, they're honestly really intense and make you a little uncomfortable.",
      enabled: (state) => state.score > 987
    }, ZombieWoodpeckers: {
      name: 'Zombie Woodpeckers',
      description: "Fallen tree dwellers have risen to join your fight, they cut trees down with their vicious pecks.",
      enabled: (state) => state.score > 3000,
    }, MaliciousIcicles: {
      name: "Malicious Icicles",
      description: "It's not readily apparent why, but the icicles that form in the area will fall into trees and deal significant damage.",
      enabled: (state) => state.score > 10000,
    }, BenevolentWitches: {
      name: "Benevolent Witches",
      description: "Kids keep coming into the woods with cameras and drawing these witches out, they seem interested in joining the fight against the tree hordes.",
      enabled: (state) => state.score > 28000
    }, ChainsawSloths: {
      name: "Chainsaw Sloths",
      description: "You wouldn't expect that something so slow would be so efficient at cutting down trees, but they manage.",
      enabled: (state) => state.score > 88000
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
