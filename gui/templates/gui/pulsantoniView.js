


const funzioneTasti = function () {
  const _parentEl = document.querySelector(".corpo");
  config.rivelatoreSezioni()

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