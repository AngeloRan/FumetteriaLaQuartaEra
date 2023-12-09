
const funzioneTasti = function () {
  const _parentEl = document.querySelector(".corpo");

  const rivelatoreSezioni = function () {
    const sezioni = [..._parentEl.querySelectorAll(".sezione")];
    sezioni.forEach((el, i) => {
      setTimeout(function () {
        el.classList.remove(`hidden-${i + 1}`);
      }, (i * 1000) / 2);
    });
 
  }

  rivelatoreSezioni()

  const _giocoPulsanti = function () {
  _parentEl.addEventListener("mouseover", function (e) {
      e.target.classList.contains("sezione") &&
        e.target.classList.add("rimuoviafter", "rimuovibefore");
    });

  _parentEl.addEventListener("mouseout", function (e) {
      e.target.classList.contains("sezione") &&
        e.target.classList.remove("rimuoviafter", "rimuovibefore");
    });
  };
  _giocoPulsanti();
}

funzioneTasti()