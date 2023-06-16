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
