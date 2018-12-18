const setupModal = function (modal) {
  document.getElementById("close").onclick = () => {
    modal.style.display = "none";
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
};

// Initiate
(function () {

  document.getElementById('clicker').onclick = () => {
    console.log('potatos');
  }; // setup click handler for the click button

  const modal = document.getElementById('modal');

  const showModal = function () {
    modal.style.display = "block";
  }

  setupModal(modal);
})();
