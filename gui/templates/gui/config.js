

const rivelatoreSezioni = function () {
  const _parentEl = document.querySelector(".corpo");
  const sezioni = [..._parentEl.querySelectorAll(".corpo > div")];
  sezioni.forEach((el, i, arr) => {
    setTimeout(function () {
      el.classList.remove(`hidden-${el.dataset.a}`);
    }, arr.length <= 4 ? (i * 1000) / 2 : 0);
  });

}