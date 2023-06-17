// Імпортуємо залежності
import { Notify } from 'notiflix/build/notiflix-notify-aio'; // Бібліотека для показу сповіщень
import 'select2/dist/js/select2.min.js'; // Бібліотека для кращого візуального представлення випадаючого списку
import 'select2/dist/css/select2.min.css'; // CSS для випадаючого списку

// Створюємо константи для наших HTML-елементів
const selectBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/'; // Базовий URL нашого API
const API_KEY = 'your_api_key'; // Ключ до нашого API (замініть "your_api_key" на ваш власний ключ)
const backdrop = document.querySelector('#backdrop');
const catModal = document.querySelector('#cat-modal-content');
const closeButton = document.querySelector('#close-button');

// Ініціалізація змінних
let chosenBred;
let breeds = [];

// Приховуємо повідомлення про помилку та фоновий екран
errorMsg.style.display = 'none';
backdrop.style.display = 'none';

// Додаємо слухач події для кнопки закриття
closeButton.addEventListener('click', () => {
  backdrop.style.display = 'none';
});

// Функція для створення HTML-розмітки для порід
function createBreedsMarkup(items) {
  return items
    .map(item => `<option value="${item.id}">${item.name}</option>`) // Створюємо випадаючий список з породами
    .join('');
}

// Функція для отримання даних про породи котів з API
export function fetchBreeds() {
  loader.style.display = 'block'; // Показуємо "завантажувач"

  // Здійснюємо запит до API
  fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure(`${errorMsg.textContent}`); // Показуємо повідомлення про помилку, якщо виникла проблема
      }
      return response.json(); // Повертаємо дані в форматі JSON
    })
    .then(data => {
      breeds = data; // Зберігаємо дані про породи в змінну
      selectBreed.innerHTML = createBreedsMarkup(data); // Заповнюємо наш випадаючий список даними про породи

      loader.style.display = 'none'; // Приховуємо "завантажувач"
    })
    .catch(error => {
      console.log(error); // Показуємо помилку в консолі
      loader.style.display = 'none'; // Приховуємо "завантажувач"
    });
}

// Функція для отримання котика обраної породи
export function fetchCatByBreed() {
  loader.style.display = 'block'; // Показуємо "завантажувач"

  // Здійснюємо запит до API
  fetch(`${BASE_URL}images/search?breed_ids=${chosenBred}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure('Котик не знайдений'); // Показуємо повідомлення про помилку, якщо котик не знайдений
      }
      return response.json(); // Повертаємо дані в форматі JSON
    })
    .then(data => {
      catModal.innerHTML = createCatInfo(data, chosenBred); // Заповнюємо модальне вікно даними про котика
      backdrop.style.display = 'flex'; // Показуємо модальне вікно
      loader.style.display = 'none'; // Приховуємо "завантажувач"
    })
    .catch(error => {
      console.log(error); // Показуємо помилку в консолі
      loader.style.display = 'none'; // Приховуємо "завантажувач"
    });
}

// Додаємо слухач події для зміни вибраної породи в списку
selectBreed.addEventListener('change', onChange);

// Функція, яка викликається при зміні вибраної породи
export function onChange(event) {
  chosenBred = event.target.value; // Зберігаємо обрану породу
  fetchCatByBreed(); // Отримуємо котика обраної породи
}

// Функція для отримання даних про породу по її ID
export function getBreedById(id) {
  return breeds.find(breed => breed.id === id); // Повертаємо породу з відповідним ID
}

// Функція для створення HTML-розмітки для котика
export function createCatInfo(catData, id) {
  const cat = catData[0]; // Дані про котика
  const catBreed = getBreedById(id); // Дані про породу котика

  // Повертаємо HTML-розмітку з даними про котика
  return `
    <h2>${catBreed.name}</h2>
    <p>${catBreed.temperament}</p>
    <p>${catBreed.description}</p>
    <img src="${cat.url}" alt="${catBreed.name}" width=500>
  `;
}
