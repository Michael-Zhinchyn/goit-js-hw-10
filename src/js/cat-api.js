import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'select2/dist/js/select2.min.js';
import 'select2/dist/css/select2.min.css';

const selectBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
const BASE_URL = 'https://api.thecatapi.com/v1/';
const API_KEY =
  'live_sGqxpzYLvFus7p2nXND3T4qIBX7yjf1C275c2408M4sTblpioeOksmdnAZteZmPh';
const backdrop = document.querySelector('#backdrop');
const catModal = document.querySelector('#cat-modal-content');
const closeButton = document.querySelector('#close-button');

let chosenBred;
let breeds = [];

errorMsg.style.display = 'none';
backdrop.style.display = 'none';

closeButton.addEventListener('click', () => {
  backdrop.style.display = 'none';
});

function createBreedsMarkup(items) {
  return items
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
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
      $('select').select2();

      loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
      loader.style.display = 'none';
    });
}

function fetchCatByBreed() {
  loader.style.display = 'block';

  fetch(`${BASE_URL}images/search?breed_ids=${chosenBred}`)
    .then(response => {
      if (!response.ok) {
        Notify.failure('Котик не знайдений');
      }
      return response.json();
    })
    .then(data => {
      catModal.innerHTML = createCatInfo(data, chosenBred);
      backdrop.style.display = 'flex';
      loader.style.display = 'none';
    })
    .catch(error => {
      console.log(error);
      loader.style.display = 'none';
    });
}

selectBreed.addEventListener('change', onChange);

function onChange(event) {
  chosenBred = event.target.value;
  fetchCatByBreed();
}

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
    <img src="${cat.url}" alt="${catBreed.name}" width=500>
  `;
}

fetchBreeds();
