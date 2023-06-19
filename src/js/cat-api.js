// Імпортуємо залежності
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';

// Створюємо константи для наших HTML-елементів
const selectBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY = 'your_api_key';
const backdrop = document.querySelector('#backdrop');
const catModal = document.querySelector('#cat-modal-content');
const closeButton = document.querySelector('#close-button');

// Ініціалізація змінних
let chosenBred = null;
let breeds = [];

let slimSelect = new SlimSelect({
  select: '.breed-select',
  placeholder: 'Select a breed',
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

closeButton.addEventListener('click', () => {
  backdrop.style.display = 'none';
});

function createBreedsMarkup(items) {
  slimSelect.setData(
    [{ text: '', value: '' }].concat(
      items.map(item => {
        return { text: item.name, value: item.id };
      })
    )
  );
}

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
      selectBreed.innerHTML = createBreedsMarkup(data);
      loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
      loader.style.display = 'none';
    });
}

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

selectBreed.addEventListener('change', event => {
  chosenBred = event.target.value;
  if (chosenBred) {
    fetchCatByBreed(chosenBred);
  }
});

function getBreedById(id) {
  return breeds.find(breed => breed.id === id);
}

function createCatInfo(catData, id) {
  const cat = catData[0];
  const catBreed = getBreedById(id);

  return `
    <h2>${catBreed.name}</h2>
    <p>${catBreed.temperament}</p>
    <p>${catBreed.description}</p>
    <img src="${cat.url}" alt="${catBreed.name}" width=600>
  `;
}
