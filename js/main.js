let test;
(function () {

  const clickable = document.getElementById('clicker');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById("close")

  closeModal.onclick = () => {
    modal.style.display = "none";
  }

  const showModal = function () {
    modal.style.display = "block";
  }

  test = showModal;

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  clickable.onclick = () => {
    console.log('potatos');
  };

})();
