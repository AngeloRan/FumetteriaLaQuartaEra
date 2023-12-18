{% load static %}

config.rivelatoreSezioni()

const ALLIN_ART_VETRINA = -50;
const vetrinaEl = document.querySelector('.vetrina');
const pulsanti = [...document.querySelectorAll('.btn_vet')];

// VETRINA



const fnVetrina = function () {
  let curArt = 6;
  let articoliVetrinaArr = [...document.querySelectorAll('.articoloInVetrina')]
  let elCentrale;

 // PREPARAZIONE VETRINA
  articoliVetrinaArr.forEach((el,i, arr) => {;
   el.classList.remove('transitionclass');
   el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
    });
  articoliVetrinaArr[6].classList.remove('sfocArtVet');
  elCentrale = articoliVetrinaArr[6];

  setTimeout(function () {
    articoliVetrinaArr.forEach(el=> el.classList.add('transitionclass'))
  }, 500)

// FUNZIONE VETRINA LOOP
    const vetLoop = function () {
    const LIMITE = this === document.querySelector('.next-pg') ? 16 : 5;
    const SELETTORE_NEXT_PREV = this === document.querySelector('.next-pg') ? 1 : -1
    const TOT_ART = this === document.querySelector('.next-pg') ? -10 : 10;
    
    curArt = curArt + SELETTORE_NEXT_PREV;
    if (curArt === LIMITE) {
      curArt = curArt + TOT_ART;
      articoliVetrinaArr.forEach((el, i) => {
      el.classList.remove('transitionclass');})

      articoliVetrinaArr.forEach((el, i, arr) => {
      el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt + SELETTORE_NEXT_PREV))}%) scale(0.5)`;
      if(i === curArt - SELETTORE_NEXT_PREV) {
        el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt + SELETTORE_NEXT_PREV))}%) scale(1)`;
        el.classList.remove('sfocArtVet')
     }
     }); 

     setTimeout(function () {
      articoliVetrinaArr.forEach(el=> el.classList.add('transitionclass'));
      articoliVetrinaArr.forEach((el,i, arr) => {
        if(i === curArt) {el.classList.remove('sfocArtVet');        elCentrale = el;
       } else {el.classList.add('sfocArtVet')}
        el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
         });
     }, 100)
    
    } else{
    articoliVetrinaArr.forEach((el,i, arr) => {
      if(i === curArt) {el.classList.remove('sfocArtVet'); elCentrale = el;} else {el.classList.add('sfocArtVet')}
      el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
       });
      }}

 
  pulsanti.forEach(el => el.addEventListener('click', vetLoop ))

  let vetrinaAuto = setInterval(vetLoop.bind(document.querySelector('.next-pg')), 6000)

  vetrinaEl.addEventListener('mouseover', function (e) {
    if(!e.target.closest('.vetrina')) return
    pulsanti.forEach((pul) => {
    pul.classList.remove('hidden-4');
    pul.classList.add('btn_vet-active');
    clearInterval(vetrinaAuto);
    })
  })

  vetrinaEl.addEventListener('mouseleave', function (e) {
    if(!e.target.closest('.vetrina')) return
    pulsanti.forEach((pul) => {
    pul.classList.add('hidden-4');
    pul.classList.remove('btn_vet-active')
    })
    vetrinaAuto = setInterval(vetLoop.bind(document.querySelector('.next-pg')), 6000)
  })



  
// INGRANDIMENTO ELEMENTO CORRENTE
 const arra = ['mousedown','mouseup'];

      arra.forEach((el) => 
      {const callback = function(e) {
      if(e.target.parentElement === elCentrale) { 
      String(this) === 'mousedown' ? elCentrale.classList.remove('transitionclass') : elCentrale.classList.add('transitionclass');
      String(this) === 'mousedown' ? elCentrale.classList.add('transitionclassVel') : elCentrale.classList.remove('transitionclassVel');
      elCentrale.style.zIndex = `${String(this) === 'mousedown' ? 1 : ''}`
      // elCentrale.style.transition = `all${String(this) === 'mousedown' ? '0.3' : '0.9'}s`
      elCentrale.style.transform = `translateX(-50%) ${String(this) === 'mousedown' ? 'scale(1.5)' : '' }`;}};
      vetrinaEl.addEventListener(el, callback.bind(el))})

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
  }
})


// {header:[art1, art2, art3]}