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
    termites: document.getElementById('termites')
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
    if (gameState.tools.Termites) {
      const termiteIncrement = timesDecimals(state.tools.Termites, tools.Termites.power);
      incrementScore(termiteIncrement, state);
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

  const displayTermites = function () {
    gameState.tools.Termites = 0;
    domElements.toolsBox.className = 'top tools';
    domElements.termites.innerHTML =
      `<strong>${tools.Termites.name}<\/strong>`+
      `<p>${tools.Termites.description}<\/p>`+
      `<span id="termiteCost">Cost: ${tools.Termites.cost}<\/span><br>`+
      `<span id="termitePower">Power: ${tools.Termites.power}<\/span><br>` +
      `<span id="numTermites">Own: ${gameState.tools.Termites}<\/span>`;

    domElements.termites.onclick = function () {
      if (gameState.score >= tools.Termites.cost) {
        gameState.tools.Termites += 1;
        console.log(tools.Termites.cost);
        decrementScore(tools.Termites.cost, gameState);
        tools.Termites.cost = timesDecimals(tools.Termites.cost, tools.Termites.exponent);
        document.getElementById('termiteCost').innerText = `Cost: ${tools.Termites.cost}`;
        document.getElementById('numTermites').innerText = `Own: ${gameState.tools.Termites}`;
      }
    }
  };

  const update = function () {
    // regular update logic goes here.
    if (gameState.tools.Termites === undefined && tools.Termites.enabled(gameState)) {
      displayTermites();
      gameState.tools.Termites = 0;
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
      exponent: 1.12,
      description: "A fresh pack of bugs to help you cut down trees",
      power: 0.1,
      enabled: (state) => state.clicks >= 3
    },
    Dwarves: {
      name: 'Dwarves',
      cost: 100,
      exponent: 1.14,
      description: "These short men really hate trees, you're not sure why but they are hard workers",
      power: 1,
      enabled: (state) => state.score > 80
    },
    FloatingAxes: {
      name: 'Floating axes',
      cost: 500,
      exponent: 1.18,
      description: "None of the dwarves will use these ominous black axes, but no matter, they'll just use themselves",
      power: 5,
      enabled: (state) => state.score > 300
    }
  };

  setupModal(domElements);
  showModal();
  startLoop();
})();
