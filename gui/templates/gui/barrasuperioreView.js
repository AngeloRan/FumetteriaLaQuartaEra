import View from './View.js';

class barrasuperioreView extends View {
  _parentEl = document.querySelector('.barracontatti');
  _hamEl = document.querySelector('.ham-menu');

  funzionalitaBarra() {
    this._parentEl.addEventListener('mouseover', this._hoverFratelli.bind(0.5));
    this._parentEl.addEventListener('mouseout', this._hoverFratelli.bind(1));
    this._menuApparitore();
  }

  _hoverFratelli(e) {
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

  _menuApparitore() {
    this._hamEl.addEventListener('click', function () {
      document.querySelector('.nav-bar').classList.toggle('navclass');
    });
  }
}

export default new barrasuperioreView();
