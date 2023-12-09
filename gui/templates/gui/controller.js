import { THRESHOLD } from './JS/config.js';
import pulsantoniView from './JS/pulsantoniView.js';
import barrasuperioreView from './JS/barrasuperioreView.js';

const init = function () {
  pulsantoniView.render();
  pulsantoniView.rivelatoreSezioni(THRESHOLD);
  barrasuperioreView.funzionalitaBarra();
};

init();
