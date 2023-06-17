import { fetchBreeds } from './js/cat-api';
fetchBreeds();

import { fetchCatByBreed } from './js/cat-api';
fetchCatByBreed();

import { toggleDescription } from './js/about';
toggleDescription();

import { onYouTubeIframeAPIReady } from './js/video';
onYouTubeIframeAPIReady();

import { createCatInfo } from './js/cat-api';
createCatInfo();

window.onload = function () {
  loader.style.display = 'none';
};

import './js/entrance-modal';
import './js/video';
