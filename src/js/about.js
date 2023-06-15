export function toggleDescription() {
  // Визначте всі елементи з класом .clickable-element
  const clickableElements = document.querySelectorAll('.clickable-element');

  clickableElements.forEach(element => {
    element.addEventListener('click', () => {
      // Пошук вкладеного елемента .description
      const descriptionElement = element.querySelector('.description');

      // Перевіряємо стан відображення елемента і перемикаємо його
      if (descriptionElement.style.display === 'none') {
        descriptionElement.style.display = 'block';
      } else {
        descriptionElement.style.display = 'none';
      }
    });
  });
}
