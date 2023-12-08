import View from './JS/View.js';

class barrasuperioreView extends View {
  _parentEl = document.querySelector('.barracontatti');
  _hamEl = document.querySelector('.ham-menu');

  funzionalitaBarra() {
    this._parentEl.addEventListener('mouseover', this.#hoverFratelli.bind(0.5));
    this._parentEl.addEventListener('mouseout', this.#hoverFratelli.bind(1));
    this.#menuApparitore();
  }

  #hoverFratelli(e) {
    if (e.target.classList.contains('el-top')) {
      const link = e.target;

      const linkSib = link
        .closest('.barracontatti')
        .querySelectorAll('.el-top');

      linkSib.forEach(li => {
        if (li !== link) li.style.opacity = this;
      });
    }
  }

  #menuApparitore() {
    this._hamEl.addEventListener('click', function () {
      const lista = document.querySelector('.lista');
      if (lista.classList.contains('scorri-menu')) {
        lista.style.transition = 'opacity 0s';
      } else {
        lista.style.transition = '';
      }
      lista.classList.toggle('scorri-menu');
    });
  }
}

export default new barrasuperioreView();
