import View from './JS/View.js';

class pulsantoniView extends View {
  _parentEl = document.querySelector('.corpo');

  rivelatoreSezioni(THRESHOLD) {
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

    osservatore.observe(this._parentEl);

    this._giocoPulsanti();
  }

  _giocoPulsanti = function () {
    this._parentEl.addEventListener('mouseover', function (e) {
      e.target.classList.contains('sezione') &&
        e.target.classList.add('rimuoviafter', 'rimuovibefore');
    });

    this._parentEl.addEventListener('mouseout', function (e) {
      e.target.classList.contains('sezione') &&
        e.target.classList.remove('rimuoviafter', 'rimuovibefore');
    });
  };

  _generateMarkup() {
    return `      
      <div class="hidden-1 sezione" data-a="1"></div>
      <div class="hidden-2 sezione" data-a="2"></div>
      <div class="hidden-3 sezione" data-a="3"></div>
      <div class="hidden-4 sezione" data-a="4"></div>
      `;
  }
}

export default new pulsantoniView();
