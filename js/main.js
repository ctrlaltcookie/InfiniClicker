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
    multipler: 0
  }

  const domElements = {
    modal: document.getElementById('modal'),
    score: document.getElementById('counter')
  }

  const incrementClicks = function (clicks, state) {
    state.clicks += clicks;
  }

  const incrementScore = function (score, state) {
    const bonus = state.bonus || 0;
    const multipler = state.multipler || 1;
    const increment = (score * multipler) + bonus;
    state.score = addDecimals(state.score, increment);
  }

  document.getElementById('clicker').onclick = () => {
    incrementClicks(1, gameState);
    incrementScore(1, gameState);
    updateScoreLabel(gameState.score);
  }; // setup click handler for the click button

  const showModal = function () {
    domElements.modal.style.display = "block";
  }

  const updateScoreLabel = function (score) {
    domElements.score.innerText = score;
  }

  const addDecimals = function (num1, num2) {
    return Math.round(num1 * 100 + num2 * 100) / 100;
  }

  const update = function () {
    // regular update logic goes here.
    console.log('updated');
  }

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
  }

  setupModal(domElements);
  showModal();
  startLoop();
})();
