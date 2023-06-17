import './js/entrance-modal';
import './js/video';

import { fetchBreeds } from './js/cat-api';
fetchBreeds();

import { toggleDescription } from './js/about';
toggleDescription();

import { onYouTubeIframeAPIReady } from './js/video';
onYouTubeIframeAPIReady();

window.onload = function () {
  loader.style.display = 'none';
};
