import { THRESHOLD } from './config';
import pulsantoniView from './pulsantoniView.js';
import barrasuperioreView from './barrasuperioreView.js';

const init = function () {
  pulsantoniView.render();
  pulsantoniView.rivelatoreSezioni(THRESHOLD);
  barrasuperioreView.funzionalitaBarra();
};
init();
