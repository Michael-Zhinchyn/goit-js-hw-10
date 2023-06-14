const selectBtn = document.querySelector('.breed-select');

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1/';
  const API_KEY =
    'live_sGqxpzYLvFus7p2nXND3T4qIBX7yjf1C275c2408M4sTblpioeOksmdnAZteZmPh';

  fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(response =>
    console.log(response)
  );
}

fetchBreeds();
