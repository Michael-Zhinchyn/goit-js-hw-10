// Отримуємо усі "клікабельні" елементи на сторінці.
const clickableElements = document.querySelectorAll('.clickable-element');

// Проходимо по всіх елементах...
clickableElements.forEach(element => {
  // Додаємо слухач події "клік" для кожного елементу.
  element.addEventListener('click', function (event) {
    // Зупиняємо "всплиття" події.
    event.stopPropagation();

    // Знайти "опис" всередині клікнутого елемента.
    const description = this.querySelector('.description');

    // Перемикаємо видимість "опису".
    description.style.display =
      description.style.display === 'none' ? 'block' : 'none';
  });
});

// Додаємо слухач події "клік" на весь документ.
document.addEventListener('click', function () {
  // Для всіх "клікабельних" елементів...
  clickableElements.forEach(element => {
    // Знайти "опис".
    const description = element.querySelector('.description');

    // Якщо "опис" видимий, зробити його невидимим.
    if (description.style.display === 'block') {
      description.style.display = 'none';
    }
  });
});
