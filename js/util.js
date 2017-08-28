function gameSave(data) {
  document.cookie = 'gameData=' + btoa(JSON.stringify(data));
}

function gameLoad () {
  return JSON.parse(atob(getCookie('gameData')));
}