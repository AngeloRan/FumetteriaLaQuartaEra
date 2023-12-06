import { THRESHOLD } from './config';
// Apparizione/Sparizione delle sezioni

const corpoEl = document.querySelector('.corpo');
const sezioni = [...document.querySelectorAll('.sezione')];

const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  const sezioni = [...entry.target.querySelectorAll('.corpo > div')];
  if (entry.isIntersecting) {
    sezioni.forEach((el, i) => {
      setTimeout(function () {
        el.classList.remove(`hidden-${i + 1}`);
      }, (i * 1000) / 2);
    });
    observer.unobserve(entry.target);
  }
};

const osservatore = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: THRESHOLD,
});

osservatore.observe(corpoEl);

//apparizione/sparizione copertura sezioni

corpoEl.addEventListener('mouseover', function (e) {
  e.target.classList.contains('sezione') &&
    e.target.classList.add('rimuoviafter', 'rimuovibefore');
});

corpoEl.addEventListener('mouseout', function (e) {
  e.target.classList.contains('sezione') &&
    e.target.classList.remove('rimuoviafter', 'rimuovibefore');
});
