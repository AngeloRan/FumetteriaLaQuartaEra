{% load static %}

config.rivelatoreSezioni()
const ALLIN_ART_VETRINA = -50;

// VETRINA

const fnVetrina = function () {
  const curArt = 1
  const artVetrinaEl = [...document.querySelectorAll('.articoloInVetrina')]
  artVetrinaEl.forEach((el,i, arr) => {
   el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * i)}%) ${+el.dataset.n !== curArt ? 'scale(0.5)' : ''}`;
    })
}



fnVetrina()





// settare Uppercase lista
const categorie = [...document.querySelectorAll('.categoriaarticolo')]
categorie.forEach(c => c.textContent = c.textContent[0].toUpperCase() + c.textContent.slice(1))


// Js-image-zoom
var options = {
  width: 350, 
  height: 350,
  zoomPosition: "original"
};

new ImageZoom(document.getElementById("img-container"), options);


const mostraDetProdotto = function (data, e) {
  console.log('PRIMA');
  console.log(data);
  const container = document.querySelector('#img-container')
    container.innerHTML= ''
    const img = `<img src="${e.target.closest('.articoli').querySelector('.img_art').src}" style="object-fit: contain;"/>`
    container.insertAdjacentHTML('afterbegin', img)
   new ImageZoom(document.getElementById("img-container"), options);
}

// eventlistener click lista
const listaEl = document.querySelector('.shopsinistra')
listaEl.addEventListener('click', function (e) {
  if(e.target.closest('.articoli')) {
    config.AJAX('test').then(data => mostraDetProdotto(data, e)).catch(err => console.log(`${err}`))
  //   const container = document.querySelector('#img-container')
  //   container.innerHTML= ''
  //   const img = `<img src="${e.target.closest('.articoli').querySelector('.img_art').src}" style="object-fit: contain;"/>`
  //   container.insertAdjacentHTML('afterbegin', img)
  //  new ImageZoom(document.getElementById("img-container"), options);
  }
})


