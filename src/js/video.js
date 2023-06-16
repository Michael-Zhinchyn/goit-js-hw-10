// Завантаження YouTube IFrame Player API коду асинхронно.
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '315',
    width: '560',
    videoId: '1COL3r-dOl4',
    events: {
      onReady: onPlayerReady,
    },
  });
}

// Задаємо гучність на 30% коли відео готове до відтворення
function onPlayerReady(event) {
  event.target.setVolume(20);
}

window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

document.getElementById('play-button').addEventListener('click', function () {
  player.playVideo();
});

document.getElementById('volume-slider').addEventListener('input', function () {
  player.setVolume(this.value);
});
