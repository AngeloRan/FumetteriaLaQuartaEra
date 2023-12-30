{% load static %}

config.rivelatoreSezioni()

// settare Uppercase lista

const articoliArr = [

  {titolo: 'naruto', tipo: 'statuina', numero: 4, img: '../../static/images/Grut.png', inserimento: Date.now() - 500,}, 
  {titolo: 'harry Potter', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg', inserimento: Date.now() - 1000}, {titolo: ' giangiukan', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg', inserimento: Date.now() - 2000}, {titolo: 'dragonball', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg', inserimento: Date.now() - 700}, {titolo: 'ilsignoredeglianelli', tipo: 'statuina', numero: 4, img: 'https://i.pinimg.com/564x/ab/51/f2/ab51f2dd6f1bbd2c8c435e4e8d403d93.jpg', inserimento: Date.now() - 8000}];



const upperLista = function () {
const categorie = document.querySelectorAll('.categoriaarticolo');
categorie.forEach(c => c.textContent = c.textContent.trim()[0].toUpperCase() + c.textContent.trim().slice(1));
const titoli = document.querySelectorAll('.nomearticolo');
titoli.forEach(c => c.textContent = c.textContent.trim()[0].toUpperCase() + c.textContent.trim().slice(1))}
upperLista()
const ALLIN_ART_VETRINA = -50;
const vetrinaEl = document.querySelector('.vetrina');
let pulsanti = [...document.querySelectorAll('.btn_vet')];
let vetrinaAuto;
const listaEl = document.querySelector('.contenitoreArticoli');
const headerEl = document.querySelector('header');
const menuArticoliEl = document.querySelector('.div-menuarticoli');
let funzioneTasti;

console.log(Number.parseFloat(getComputedStyle(document.querySelector('.shopsinistra')).width, 10));

const headerObserver = new IntersectionObserver(function (entries) {
  const[entry] = entries
  if (!entry.isIntersecting) {
    document.getElementById('hamMenuLista').classList.remove('hidden-1');
    document.getElementById('hamMenuLista').style.width = Number.parseFloat(getComputedStyle(document.querySelector('.shopsinistra')).width, 10)+'px';
    document.getElementById('hamMenuLista').style.height = '50px'
   document.getElementById('hamMenuLista').style.position = 'fixed'
  }
  else   {
    document.getElementById('hamMenuLista').classList.add('hidden-1');
    document.getElementById('hamMenuLista').style.width = ''
    document.getElementById('hamMenuLista').style.position = ''
    document.getElementById('hamMenuLista').style.height = ''
  }}, {
  root: null,
  threshold: 0,
  rootMargin: `${getComputedStyle(menuArticoliEl).height}`
});

headerObserver.observe(headerEl);

window.addEventListener('resize', function () {
  document.getElementById('hamMenuLista').style.width = Number.parseFloat(getComputedStyle(document.querySelector('.shopsinistra')).width, 10)+'px';
})



const fnVetrina = function (totale) {
  vetrinaEl.classList.remove('hidden-1')
  let curArt = 3;
  let articoliVetrinaArr = [...document.querySelectorAll('.articoloInVetrina')]
  let elCentrale;
  let ultimoClick = 0;
  const intervalloClick = 500;

 // PREPARAZIONE VETRINA
  articoliVetrinaArr.forEach((el,i, arr) => {;
   el.classList.remove('transitionclass');
   el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.45)' : ''}`;
    });
  articoliVetrinaArr[curArt].classList.remove('sfocArtVet');
  elCentrale = articoliVetrinaArr[curArt];

  setTimeout(function () {
    articoliVetrinaArr.forEach(el=> el.classList.add('transitionclass'))
  }, 1000)

// FUNZIONE VETRINA LOOP
    const vetLoop = function () {
      console.log('LOOP');
      const LIMITE = this === document.querySelector('.next-pg') ? (totale + 3) : 2;
      const SELETTORE_NEXT_PREV = this === document.querySelector('.next-pg') ? 1 : -1
      const TOT_ART = this === document.querySelector('.next-pg') ? -totale : totale;
      const ora = Date.now()
      if (ora - ultimoClick >= intervalloClick) {
      
      curArt = curArt + SELETTORE_NEXT_PREV;
      if (curArt === LIMITE) {
        curArt = curArt + TOT_ART;
        articoliVetrinaArr.forEach((el, i) => {
        el.classList.remove('transitionclass');})

        articoliVetrinaArr.forEach((el, i, arr) => {
        el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt + SELETTORE_NEXT_PREV))}%) scale(0.45)`;
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
          el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.45)' : ''}`;
          });
      }, 100)
      
      } else{
      articoliVetrinaArr.forEach((el,i, arr) => {
        if(i === curArt) {el.classList.remove('sfocArtVet'); elCentrale = el;} else {el.classList.add('sfocArtVet')}
        el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.45)' : ''}`;
        }); ultimoClick = ora;
    }}}
  
  
  
  pulsanti.forEach(el => el.addEventListener('click', vetLoop ));

   funzioneTasti = function (e) {
    if(e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.key === 'ArrowRight' && vetLoop.call(document.querySelector('.next-pg'));
    e.key === 'ArrowLeft' && vetLoop.call(document.querySelector('.prev-pg'));
  };

  document.addEventListener('keydown', funzioneTasti );

  vetrinaAuto = setInterval(vetLoop.bind(document.querySelector('.next-pg')), 6000)

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
    clearInterval(vetrinaAuto);
    vetrinaAuto = setInterval(vetLoop.bind(document.querySelector('.next-pg')), 6000)
  })

  vetrinaEl.addEventListener('click' , function (e) {
    if(!e.target.closest('.articoloInVetrina')) {return};
    mostraDetProdotto(e, true);
  } )

}
fnVetrina(12)

// ORDINA PER ORDINE ALFABETICO


const funzioneSort = function (nonrev = true, nonNum = true) {

  const markup = articoliArr.toSorted((a, b) => {
    if(!nonNum) { return nonrev ? b.inserimento - a.inserimento : a.inserimento - b.inserimento} 
    else{
    if(!nonrev) {
      if (a.titolo.trim().toUpperCase() > b.titolo.trim().toUpperCase()) return -1;
      if (a.titolo.trim().toUpperCase() < b.titolo.trim().toUpperCase()) return 1
    } else{
      if (a.titolo.trim().toUpperCase() > b.titolo.trim().toUpperCase()) return 1;
      if (a.titolo.trim().toUpperCase() < b.titolo.trim().toUpperCase()) return -1
    }}}).map(el => `    
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

    upperLista()
}


document.getElementById('sortAl').addEventListener('click', funzioneSort)
document.getElementById('sortRevAl').addEventListener('click', function() {
  funzioneSort(false)
})
document.getElementById('sortNum').addEventListener('click', function () {
  funzioneSort(true, false)
})
document.getElementById('sortRevNum').addEventListener('click', function () {
  funzioneSort(false, false)
})

document.getElementById('mettiInVet').addEventListener('click', function (e) {
  document.removeEventListener('keydown', funzioneTasti);
  clearInterval(vetrinaAuto);
  vetrinaEl.classList.add('hidden-1');
  document.body.scrollIntoView({ behavior: 'smooth' })
  new Promise (function (fulfill, reject) {
    setTimeout(function () {
      fulfill()
    }, 800)
  }).then(function () {
    const markup = articoliArr.map(el => `<div class="articoloInVetrina transitionclass sfocArtVet"><img class="immagineInVetrina" src="${el.img}" alt="${el.titolo}"></div>`)
    .join('') 
    + articoliArr.map(el => `<div class="articoloInVetrina transitionclass sfocArtVet"><img class="immagineInVetrina" src="${el.img}" alt="${el.titolo}"></div>`)
    .join('') 
    + `<button class="btn_vet next-pg hidden-4"><i class="fa-solid fa-arrow-right"></i></button><button class="btn_vet prev-pg hidden-4"><i class="fa-solid fa-arrow-left"></i></button>`
  vetrinaEl.innerHTML = '';
  vetrinaEl.insertAdjacentHTML('afterbegin', markup)
  pulsanti = [...document.querySelectorAll('.btn_vet')];
  fnVetrina(articoliArr.length);
  vetrinaEl.classList.remove('hidden-1')
  }) 
})



// RICERCA
document.getElementById('shopSubmit').addEventListener('click', function (e) {
  document.getElementById('shopRicerca').value = ''
})





const mostraDetProdotto = function (e, vet = false) {
  const container = document.querySelector('.magnify-wrapper');
    container.innerHTML= '';
    const img = `<div id="lenteIngrandimento"><i class="fa-solid fa-magnifying-glass-plus"></i></div><img
    src="${vet ? e.target.closest('.articoloInVetrina').querySelector('.immagineInVetrina').src : e.target.closest('.articoli').querySelector('.img_art').src}"
    id="main-img" />
    <div id="large-img" class="largeImg" style = "background: url(${vet ? e.target.closest('.articoloInVetrina').querySelector('.immagineInVetrina').src : e.target.closest('.articoli').querySelector('.img_art').src}) no-repeat #fff"></div>`;
    container.insertAdjacentHTML('afterbegin', img);
    menuArticoliEl.scrollIntoView({ behavior: 'smooth' })
    document.getElementById('lenteIngrandimento').addEventListener('click', function (e) {
      if(e.target.closest('#lenteIngrandimento')) {
       document.getElementById('large-img').classList.add('largeImg')
      }
     })

   const contenitoreTit = document.querySelector('.caratteristicheProd');
   contenitoreTit.innerHTML = '';
   const markupTit = `<h4 class="titoloArticolo">${vet ? e.target.closest('.articoloInVetrina').querySelector('.immagineInVetrina').alt: e.target.closest('.articoli').querySelector('.nomearticolo').textContent}</h4>`
   contenitoreTit.insertAdjacentHTML('afterbegin', markupTit);

}

// eventlistener click lista

listaEl.addEventListener('click', function (e) {
  if(e.target.closest('.articoli')) {
    mostraDetProdotto(e);
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



// MAGNIFIER
const zoomImmagine = function (e) {

  let original = document.getElementById('main-img'),
    magnified = document.getElementById('large-img'),
    style = magnified.style,
    x = e.pageX - this.offsetLeft,
    y = e.pageY - this.offsetTop,
    imgWidth = original.width,
    imgHeight = original.height,
    xperc = (x / imgWidth) * 200,
    yperc = (y / imgHeight) * 150;
    // original.style.opacity = '0'
  // Add some margin for right edge
  if (x > 0.01 * imgWidth) {
    xperc += 0.15 * xperc;
  }

  // Add some margin for bottom edge
  if (y >= 0.01 * imgHeight) {
    yperc += 0.15 * yperc;
  }

  // Set the background of the magnified image horizontal
  style.backgroundPositionX = xperc - 40 + '%';
  // Set the background of the magnified image vertical
  style.backgroundPositionY = yperc - 40 + '%';

  // Move the magnifying glass with the mouse movement.
  style.left =  -100 + 'px';
  style.top =  -100 + 'px';
}

document.getElementById('zoom').addEventListener('click', function (e) {
 if(e.target.closest('#lenteIngrandimento')) {
  // document.getElementById('large-img').classList.add('largeImg')
  document.getElementById('large-img').style.opacity = '1'
 }
})

document.getElementById('zoom').addEventListener(
  'mousemove', zoomImmagine,false);


document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && document.getElementById('large-img').classList.contains('largeImg')) {
    // document.getElementById('large-img').classList.remove('largeImg');
    document.getElementById('large-img').style.opacity = '0'
  }
});

document.addEventListener('click', function (e) {
  if(!e.target.closest('#zoom') && document.getElementById('large-img').classList.contains('largeImg')) {
    // document.getElementById('large-img').classList.remove('largeImg');
    document.getElementById('large-img').style.opacity = '0'
  }
})

// document.getElementById('zoom').addEventListener(
//   'mouseleave',
//   function (e) { 
//   document.getElementById('large-img').classList.remove('largeImg')
//   })

