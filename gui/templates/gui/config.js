

class Config {

 rivelatoreSezioni () {
  const _parentEl = document.querySelector(".corpo");
  const sezioni = [..._parentEl.querySelectorAll(".corpo > div")];
 sezioni.forEach((el, i, arr) => {
    setTimeout(function () {
      el.classList.remove(`hidden-${el.dataset.a}`);
      i === arr.length-1 && _parentEl.classList.remove('overflowHidden')
    }, arr.length <= 4 ? (i * 1000) / 2 : 0);
  });

}

  async AJAX (url) {
    try{
     const res = await fetch(url)
     console.log(res);
     const data = res.json()
     if (!res.ok) {throw new Error()};
     return data
    } catch (err) {
      console.error(err)
      throw err
    }
  }

}

const config = new Config()