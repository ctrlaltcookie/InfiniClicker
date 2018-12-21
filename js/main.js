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

  const gameState = {
    clicks: 0,
    score: 0,
    bonus: 0,
    multiplier: 0,
    tools: {
    }
  };

  const domElements = {
    modal: document.getElementById('modal'),
    score: document.getElementById('counter'),
    toolsBox: document.getElementById('toolsBox'),
    Termites: document.getElementById('termites'),
    Dwarves: document.getElementById('dwarves')
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

  const incrementScoreByTools = function (state) {
    let termiteIncrement = 0;
    let dwarvesIncrement = 0;
    if (state.tools.Termites) {
      termiteIncrement = timesDecimals(state.tools.Termites, tools.Termites.power);
    }
    if (state.tools.Dwarves) {
      dwarvesIncrement = timesDecimals(state.tools.Dwarves, tools.Dwarves.power);
    }
    const increment = addDecimals(termiteIncrement, dwarvesIncrement);
    if (increment > 0) {
      incrementScore(increment, state);
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
    state.tools[tool] = 0;
    domElement.className = 'tool'
    domElement.innerHTML =
      `${tools[tool].name}<br>`+
      `<span id="num${tool}">Owned: ${state.tools[tool]}<\/span><br>` +
      `<span id="${tool}Cost">Price: ${tools[tool].cost}<\/span><br>`+
      `<span id="${tool}Power">Logs/s: ${tools[tool].power}<\/span><br>` +
      `<p>${tools[tool].description}<\/p>`;

    domElement.onclick = function () {
      if (state.score >= tools[tool].cost) {
        state.tools[tool] += 1;
        decrementScore(tools[tool].cost, state);
        tools[tool].cost = timesDecimals(tools[tool].cost, tools[tool].exponent);
        document.getElementById(`${tool}Cost`).innerText = `Price: ${tools[tool].cost}`;
        document.getElementById(`num${tool}`).innerText = `Owned: ${state.tools[tool]}`;
      }
    }
  }

  const update = function () {
    // regular update logic goes here.
    if (gameState.tools.Termites === undefined && tools.Termites.enabled(gameState)) {
      domElements.toolsBox.className = 'top tools'
      displayTool(domElements.Termites, 'Termites', gameState);
    }
    if (gameState.tools.Dwarves === undefined && tools.Dwarves.enabled(gameState)) {
      displayTool(domElements.Dwarves, 'Dwarves', gameState);
    }
    incrementScoreByTools(gameState);
  };

  const startLoop = function () {
    let interval = 1000; // ms
    let expected = Date.now() + interval;
    setTimeout(step, interval);
    function step() {
      const dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
        console.log('Something went wrong in the game loop, it might be smart to restart');
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
      cost: 10,
      exponent: 1.22,
      description: "A fresh pack of bugs to help you cut down trees",
      power: 0.1,
      enabled: (state) => state.clicks >= 3
    },
    Dwarves: {
      name: 'Dwarves',
      cost: 100,
      exponent: 1.20,
      description: "These short men really hate trees, you're not sure why but they are hard workers",
      power: 1,
      enabled: (state) => state.score > 80
    },
    FloatingAxes: {
      name: 'Floating axes',
      cost: 500,
      exponent: 1.24,
      description: "None of the dwarves will use these ominous black axes, but no matter, they'll just use themselves",
      power: 5,
      enabled: (state) => state.score > 300
    }
  };

  setupModal(domElements);
  showModal();
  startLoop();
})();
