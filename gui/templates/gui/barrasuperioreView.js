const funzioneBarra = function () {
  const _parentEl = document.querySelector(".barracontatti");
  const _hamEl = document.querySelector(".ham-menu");

  const funzionalitaBarra = function () {
    _parentEl.addEventListener("mouseover", _hoverFratelli.bind(0.5));
    _parentEl.addEventListener("mouseout", _hoverFratelli.bind(1));
    _menuApparitore();
  };

  const _hoverFratelli = function (e) {
    if (e.target.classList.contains("el-top")) {
      const link = e.target;

      const linkSib = link
        .closest(".barracontatti")
        .querySelectorAll(".el-top");

      linkSib.forEach((li) => {
        if (li !== link) li.style.opacity = this;
      });
    }
  };

  const _menuApparitore = function () {
    this._hamEl.addEventListener("click", function () {
      document.querySelector(".nav-bar").classList.toggle("navclass");
    });
  };
};

funzioneBarra();
