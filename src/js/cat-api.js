export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/';
  const API_KEY =
    'live_sGqxpzYLvFus7p2nXND3T4qIBX7yjf1C275c2408M4sTblpioeOksmdnAZteZmPh';

  loader.style.display = 'block';

  fetch(`${BASE_URL}breeds?api_key=${API_KEY}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      selectInput.innerHTML = createMarkup(data);
      loader.style.display = 'none';
    })
    .catch(error => {
      Notiflix.failure(`${errorMsg.textContent}`);
      console.log(error);
      loader.style.display = 'none';
    });
}

function createMarkup(items) {
  return items
    .map(item => `<option value="${item.id}">${item.name}</option>`)
    .join('');
}

const selectInput = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMsg = document.querySelector('.error');
errorMsg.style.display = 'none';
