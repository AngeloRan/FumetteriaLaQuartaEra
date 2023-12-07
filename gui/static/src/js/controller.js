import { THRESHOLD } from './config';
// Apparizione/Sparizione delle sezioni

const corpoEl = document.querySelector('.corpo');
const sezioni = [...document.querySelectorAll('.sezione')];
const barraSuperioreEl = document.querySelector('.barracontatti');
console.log(barraSuperioreEl);

const sectionReveal = function (entries, observer) {
  const [entry] = entries;
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

// hover link top-bar

const hoverFratelli = function (e) {
  if (e.target.classList.contains('el-top')) {
    const link = e.target;

    const linkSib = link.closest('.barracontatti').querySelectorAll('.el-top');

    linkSib.forEach(li => {
      if (li !== link) li.style.opacity = this;
    });
  }
};

barraSuperioreEl.addEventListener('mouseover', hoverFratelli.bind(0.5));

barraSuperioreEl.addEventListener('mouseout', hoverFratelli.bind(1));
