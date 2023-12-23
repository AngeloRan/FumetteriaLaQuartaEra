{% load static %}

config.rivelatoreSezioni()


// ORDINA PER ORDINE ALFABETICO


const articoliArr = [{titolo: 'naruto', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg' }, {titolo: 'harry Potter', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg'}, {titolo: 'Giangiukan', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg'}, {titolo: 'dragonball', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg'}, {titolo: 'ilsignoredeglianelli', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg'}];


const funzioneSort = function (nonrev = true) {

  const markup = articoliArr.toSorted((a, b) => {

    if(!nonrev) {
      if (a.titolo.toUpperCase() > b.titolo.toUpperCase()) return -1;
      if (a.titolo.toUpperCase() < b.titolo.toUpperCase()) return 1
    } else{
      if (a.titolo.toUpperCase() > b.titolo.toUpperCase()) return 1;
      if (a.titolo.toUpperCase() < b.titolo.toUpperCase()) return -1
    }}).map(el => `    
      <div class="articoli container">
        <figure class="figure-img">
          <img class="img_art" src=${el.img} alt="">
        </figure>
        <div class="articoli_label">
        <h4 class="nomearticolo">${el.titolo}</h4>
        <p class="categoriaarticolo">${el.tipo}</p>
        </div>
      </div>`).join('')

    document.querySelector('.contenitoreArticoli').innerHTML = '';
    document.querySelector('.contenitoreArticoli').insertAdjacentHTML('afterbegin', markup)
}

document.getElementById('sortAl').addEventListener('click', funzioneSort)
document.getElementById('sortRevAl').addEventListener('click', function() {
  funzioneSort(false)
})



const ALLIN_ART_VETRINA = -50;
const vetrinaEl = document.querySelector('.vetrina');
const pulsanti = [...document.querySelectorAll('.btn_vet')];

// VETRINA



const fnVetrina = function () {
  let curArt = 6;
  let articoliVetrinaArr = [...document.querySelectorAll('.articoloInVetrina')]
  let elCentrale;
  let ultimoClick = 0;
  const intervalloClick = 500;

 // PREPARAZIONE VETRINA
  articoliVetrinaArr.forEach((el,i, arr) => {;
   el.classList.remove('transitionclass');
   el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
    });
  articoliVetrinaArr[6].classList.remove('sfocArtVet');
  elCentrale = articoliVetrinaArr[6];

  setTimeout(function () {
    articoliVetrinaArr.forEach(el=> el.classList.add('transitionclass'))
  }, 1000)

// FUNZIONE VETRINA LOOP
    const vetLoop = function () {
      const LIMITE = this === document.querySelector('.next-pg') ? 16 : 5;
      const SELETTORE_NEXT_PREV = this === document.querySelector('.next-pg') ? 1 : -1
      const TOT_ART = this === document.querySelector('.next-pg') ? -10 : 10;
      const ora = Date.now()
      if (ora - ultimoClick >= intervalloClick) {
      
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
        }); ultimoClick = ora;
    }}}
    

 





  pulsanti.forEach(el => el.addEventListener('click', vetLoop ))

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowRight' && vetLoop.call(document.querySelector('.next-pg'));
    e.key === 'ArrowLeft' && vetLoop.call(document.querySelector('.prev-pg'));
  });

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

    // const arra = ['mousedown','mouseup'];

    //   arra.forEach((el) => 
    //   {const callback = function(e) {
    //   if(e.target.parentElement === elCentrale) { 
    //   String(this) === 'mousedown' ? elCentrale.classList.remove('transitionclass') : elCentrale.classList.add('transitionclass');
    //   String(this) === 'mousedown' ? elCentrale.classList.add('transitionclassVel') : elCentrale.classList.remove('transitionclassVel');
    //   elCentrale.style.zIndex = `${String(this) === 'mousedown' ? 1 : ''}`
    //   // elCentrale.style.transition = `all${String(this) === 'mousedown' ? '0.3' : '0.9'}s`
    //   // elCentrale.style.transform = `translateX(-50%) ${String(this) === 'mousedown' ? 'scale(1.5)' : '' }`;
    //   elCentrale.querySelector('.immagineInVetrina').style.transform = `${String(this) === 'mousedown' ? 'scale(1.5)' : '' }`}};

    //   vetrinaEl.addEventListener(el, callback.bind(el))})

}
fnVetrina()

// RICERCA
document.getElementById('shopSubmit').addEventListener('click', function (e) {
  document.getElementById('shopRicerca').value = ''
})

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

   const contenitoreTit = document.querySelector('.caratteristicheProd');
   contenitoreTit.innerHTML = '';
   const markupTit = `<h4 class="titoloArticolo">${e.target.closest('.articoli').querySelector('.nomearticolo').textContent}</h4>`
   contenitoreTit.insertAdjacentHTML('afterbegin', markupTit)
}

// eventlistener click lista
const listaEl = document.querySelector('.shopsinistra')

listaEl.addEventListener('click', function (e) {
  if(e.target.closest('.articoli')) {
    config.AJAX('test').then(data => mostraDetProdotto(data, e)).catch(err => console.log(`${err}`))
    const selezionato = e.target.closest('.articoli');
    const Allarticoli = listaEl.querySelectorAll('.articoli')
    Allarticoli.forEach((el) => el === selezionato ? el.classList.add('articoloselezionato') : el.classList.remove('articoloselezionato'))
  }

})


const selettoreCategoriaArt = function () {
  const menu = document.querySelector('.div-menuarticoli');
  menu.addEventListener('click', function (e) {
    e.preventDefault();
    if(!e.target.closest('.vocimenu')) return;
    const selezionato = e.target.closest('.vocimenu');
    const categorie = menu.querySelectorAll('.vocimenu')
    categorie.forEach((el) => el === selezionato ? el.classList.add('selVociMenu') : el.classList.remove('selVociMenu'))
  })
}

selettoreCategoriaArt()

// RIVELATORE MENU LISTA
document.querySelector('.shopsinistra').addEventListener('mouseover' , function (e) {
  document.getElementById('hamMenuLista').classList.remove('hidden-1')
})

document.querySelector('.shopsinistra').addEventListener('mouseleave' , function (e) {
  document.getElementById('hamMenuLista').classList.add('hidden-1')
})

