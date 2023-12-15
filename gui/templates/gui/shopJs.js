{% load static %}

config.rivelatoreSezioni()



// Uppercase lista articoli
// const titoli = [...document.querySelectorAll('.nomearticolo')]
// titoli.forEach(t => t.textContent = t.textContent.toUpperCase())

const categorie = [...document.querySelectorAll('.categoriaarticolo')]
categorie.forEach(c => c.textContent = c.textContent[0].toUpperCase() + c.textContent.slice(1))


// Js-image-zoom
var options = {
  width: 350, 
  height: 350,
};

new ImageZoom(document.getElementById("img-container"), options);


// eventlistener click lista
const listaEl = document.querySelector('.shopsinistra')
listaEl.addEventListener('click', function (e) {
  if(e.target.closest('.articoli')) {
    config.AJAX()
    const container = document.querySelector('#img-container')
    container.innerHTML= ''
    const img = `<img src="${e.target.closest('.articoli').querySelector('.img_art').src}" style="object-fit: contain;"/>`
    container.insertAdjacentHTML('afterbegin', img)
  //  container.firstElementChild.src = e.target.closest('.articoli').querySelector('.img_art').src 
   new ImageZoom(document.getElementById("img-container"), options);
  }
})