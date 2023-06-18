import './js/entrance-modal';
import './js/video';

import { fetchBreeds } from './js/cat-api';
fetchBreeds();

import { toggleDescription } from './js/about';
toggleDescription();

import { loader } from './js/cat-api';

window.onload = function () {
  loader.style.display = 'none';
};
