function triggerSnark(score) {
  if (score === 10) {
    beSnarky("Hey look at that, you've clicked 10 times, that's a lot of strain on your mouse, maybe use some of your clicks on an upgrade or two.");
  }
};

function beSnarky (snark) {
  $(`<div>${snark}</div>`).appendTo('#message');
  scroll();
}