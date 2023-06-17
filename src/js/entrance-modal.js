// Слухаємо подію завантаження контенту документа
document.addEventListener('DOMContentLoaded', event => {
  // Отримуємо доступ до модального вікна та кнопки в документі
  const modal = document.querySelector('.modal');
  const button = document.querySelector('.entrance-modal-Btn');

  // Створюємо новий елемент script для підключення YouTube API
  let tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  let firstScriptTag = document.getElementsByTagName('script')[0];
  // Вставляємо новий елемент script перед існуючими скриптами в документі
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // Оголошуємо глобальну змінну player
  window.player;

  // Ця функція викликається YouTube API
  function onYouTubeIframeAPIReady() {
    // Ініціалізуємо плеєр YouTube з відео
    player = new YT.Player('player', {
      height: '315',
      width: '560',
      videoId: '1COL3r-dOl4',
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  // Ця функція викликається, коли плеєр готовий до відтворення відео
  function onPlayerReady(event) {
    event.target.setVolume(30); // Встановлюємо гучність відео

    // Додаємо слухач події для кнопки, який відтворює відео, ховає модальне вікно і видаляє елемент
    button.addEventListener('click', () => {
      player.playVideo();
      modal.style.display = 'none';
      el.parentNode.removeChild(el);
    });
  }

  window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

  // Створюємо новий елемент div
  const el = document.createElement('div');

  // Налаштовуємо атрибути та стилі нового елемента
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

  // Додаємо новий елемент в документ
  document.body.appendChild(el);

  // Показуємо модальне вікно
  modal.style.display = 'block';
});
