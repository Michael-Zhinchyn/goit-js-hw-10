import { fetchBreeds } from './js/cat-api';
fetchBreeds();

import { toggleDescription } from './js/about';
toggleDescription();

window.onload = function () {
  loader.style.display = 'none';
};
