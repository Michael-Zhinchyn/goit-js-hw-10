// Ініціалізуйте player як глобальну змінну
let player;

//  функція onYouTubeIframeAPIReady повинна створювати новий екземпляр player
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {});
}

document.getElementById('play-button').addEventListener('click', function () {
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

document.getElementById('volume-slider').addEventListener('input', function () {
  player.setVolume(this.value);
});
