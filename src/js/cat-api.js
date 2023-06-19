// Імпортуємо потрібні нам бібліотеки
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
export const loader = document.querySelector('.loader');

// Оголошуємо змінні для наших HTML-елементів
const selectBreed = document.querySelector('.breed-select');
const errorMsg = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'your_api_key';
const backdrop = document.querySelector('#backdrop');
const catModal = document.querySelector('#cat-modal-content');
const closeButton = document.querySelector('#close-button');

// Оголошуємо глобальні змінні
let chosenBred = null;
let breeds = [];

// Ініціалізуємо об'єкт slimSelect
let slimSelect = new SlimSelect({
  select: '.breed-select',
  placeholder: 'Loading breeds...',
  allowDeselect: true,
  deselectLabel: '<span class="placeholder">Select a breed</span>',
  showFirstOption: false,
  onChange: info => {
    let selectedBreed = info[0].value;
    if (selectedBreed) {
      fetchCatByBreed(selectedBreed);
    }
  },
});

errorMsg.style.display = 'none';
backdrop.style.display = 'none';

// Додаємо подію на кнопку закриття модального вікна
closeButton.addEventListener('click', () => {
  backdrop.style.display = 'none';
});

// Функція для створення розмітки для порід
function createBreedsMarkup(items) {
  slimSelect.setData(
    [{ text: 'Select a breed', value: '' }].concat(
      items.map(item => {
        return { text: item.name, value: item.id };
      })
    )
  );
}

// Функція для отримання даних про породи
export function fetchBreeds() {
  loader.style.display = 'block';
  fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure(`${errorMsg.textContent}`);
      }
      return response.json();
    })
    .then(data => {
      breeds = data;
      createBreedsMarkup(data);
      loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
      loader.style.display = 'none';
    });
}

// Функція для отримання даних про котів за породою
export function fetchCatByBreed(breed) {
  if (!breed) {
    return;
  }
  loader.style.display = 'block';
  fetch(`${BASE_URL}images/search?breed_ids=${breed}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure('Котик не знайдений');
      }
      return response.json();
    })
    .then(data => {
      catModal.innerHTML = createCatInfo(data, breed);
      backdrop.style.display = 'flex';
      loader.style.display = 'none';
    })
    .catch(error => {
      Notify.failure("this cat wasn't found :(", 'okay');
      console.log(error);
      loader.style.display = 'none';
    });
}

// Додаємо подію на зміну вибору породи
selectBreed.addEventListener('change', event => {
  chosenBred = event.target.value;
  if (chosenBred) {
    fetchCatByBreed(chosenBred);
  }
});

// Функція для отримання породи за ID
function getBreedById(id) {
  return breeds.find(breed => breed.id === id);
}

// Функція для створення розмітки для інформації про кота
function createCatInfo(catData, id) {
  const cat = catData[0];
  const catBreed = getBreedById(id);
  return `
    <div class="cat-info-container">
      <div class="cat-text">
        <h2>${catBreed.name}</h2>
        <p>${catBreed.temperament}</p>
        <p>${catBreed.description}</p>
      </div>
      <div class="cat-image">
        <img src="${cat.url}" alt="${catBreed.name}">
      </div>
    </div>
  `;
}
