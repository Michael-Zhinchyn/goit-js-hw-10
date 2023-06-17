// Оголошуємо змінну player як глобальну
let player;

// Функція onYouTubeIframeAPIReady, яка буде викликана коли YouTube IFrame API буде готовий
function onYouTubeIframeAPIReady() {
  // Створюємо новий екземпляр плеєра
  player = new YT.Player('player', {});
}

// Додаємо слухач події для кнопки play-button
document.getElementById('play-button').addEventListener('click', function () {
  // Перевіряємо поточний стан плеєра
  if (player.getPlayerState() === YT.PlayerState.PLAYING) {
    // Якщо плеєр відтворює, призупиняємо відтворення
    player.pauseVideo();
  } else {
    // Якщо плеєр зупинений, починаємо відтворення
    player.playVideo();
  }
});

// Додаємо слухач події для ползунка volume-slider
document.getElementById('volume-slider').addEventListener('input', function () {
  // Встановлюємо гучність плеєра згідно значення ползунка
  player.setVolume(this.value);
});
