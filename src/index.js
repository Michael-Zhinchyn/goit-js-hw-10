import { fetchBreeds } from './js/cat-api';
fetchBreeds();

import { fetchCatByBreed } from './js/cat-api';
fetchCatByBreed();

import { toggleDescription } from './js/about';
toggleDescription();

window.onload = function () {
  loader.style.display = 'none';
};
