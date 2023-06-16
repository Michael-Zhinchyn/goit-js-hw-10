document.addEventListener('DOMContentLoaded', event => {
  const modal = document.querySelector('.modal');
  const button = document.querySelector('.modal button');

  // Завантажуємо YouTube IFrame Player API код асинхронно
  var tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  window.player; // Зробіть об'єкт player глобальним
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
    event.target.setVolume(30);
  }

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  // Створюємо елемент при відкритті модального вікна
  const el = document.createElement('div');

  // Встановлюємо параметри елементу
  el.title = 'We stand with Ukraine';
  el.style.cursor = 'pointer';
  el.style.right = '-80px';
  el.style.bottom = '20px';
  el.style.transform = 'rotate(135deg)';
  el.style.background = 'linear-gradient(-360deg, #005BBB 50%, #FFD500 50%)';
  el.style.width = '200px';
  el.style.height = '54px';
  el.style.position = 'fixed';
  el.style.zIndex = '999';

  el.setAttribute('id', 'we-stand-with-ukraine');
  document.body.appendChild(el);

  // Показуємо модальне вікно при відкритті сторінки
  modal.style.display = 'block';

  // При кліку на кнопку модального вікна відтворюємо відео, ховаємо модальне вікно та видаляємо елемент
  button.addEventListener('click', () => {
    player.playVideo();
    modal.style.display = 'none';
    el.parentNode.removeChild(el);
  });
});