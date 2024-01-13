

{% load static %}

config.rivelatoreSezioni()

// settare Uppercase lista



const aggiornaAllArr = function () {
  articoliArr = createArtArr();
  articoliInVetrinaArr = createVetArr();
  articoliTotali = createArrTot();
}

const createVetArr = function (list = [...document.querySelectorAll('.articoloInVetrina')]) {
  return list.map(function (el, i, arr) {
  return {
    titolo: el.querySelector('.immagineInVetrina').alt,
    tipo: el.dataset.descrizionebreve,
    inserimento: el.dataset.inserimento,
    img: el.querySelector('.immagineInVetrina').src,
    id: +el.dataset.id,
    descrizioneLunga: el.dataset.descrizione
  }
}).splice(list.length/2, list.length/2)
};

const createArtArr = function (list = [...document.querySelectorAll('.articoli')]) {
  return list.map(function (el) {

    return {
      titolo: el.querySelector('.nomearticolo').textContent,
      tipo: el.querySelector('.categoriaarticolo').textContent,
      inserimento: el.dataset.inserimento,
      img: el.querySelector('.img_art').src,
      id: +el.dataset.id,
      descrizioneLunga: el.dataset.descrizione
    }
  })
}

const createArrTot = function (a = articoliArr, b = articoliInVetrinaArr) {
 return [...a, ...b ].reduce((acc,cur) => {
  const duplicato = acc.some(el => el.id === cur.id);
  if (!duplicato) {
    acc.push(cur)
  }
  return acc
 }, [])
}

const init = function ()  {
}

const vetrinaIniziale = createVetArr();
let articoliArr = createArtArr();
let articoliInVetrinaArr = createVetArr();
let articoliTotali = createArrTot();
let pagineTotali = {{pagine_totali}};
let ultimaPag = `...<button class="pagina ultimaPag" onclick="cambiaPg(${pagineTotali})">${pagineTotali}</button>`
let arrBtn = Array.from({length: pagineTotali}, (el,i) => i+1)
.map((el =>`<button class="pagina" onclick="cambiaPg(${el})">${el}</button>`)).reduce((acc,cur) => {
  if (acc.length === 0 || acc[acc.length - 1].length === 5) {
  acc.push([cur]);
} else {
  acc[acc.length - 1].push(cur);
}
return acc;
}, []);
let sottoArrCur = 0;
let pagCur = 1;

document.querySelector('.containerPag').innerHTML = '';

if(arrBtn[0].length > 1){
  document.querySelector('.containerPag').insertAdjacentHTML('afterbegin', 
  arrBtn[sottoArrCur].join('') + ((sottoArrCur === 0 && arrBtn.length > 1) ? `<button class="freccePaginazione paginazNext" onclick="aggiornaPagineVisibili(sottoArrCur+1)"><i class="fa-solid fa-chevron-right"></i></button>` + ultimaPag : ''))
};

[...document.querySelectorAll('.pagina')].forEach((el,i) => {
  return +el.textContent === pagCur ? el.style.color = 'black' : el.style.color = 'darkred'})


const aggiornaPagineVisibili = function (numero, ful) {
  // console.log([...document.querySelectorAll('.pagina')]);
  if(numero < 0) {
    ful && ful();
    return};
  if(numero > arrBtn.length-1) {
    ful && ful();
    return};
  if(sottoArrCur === numero && [...document.querySelectorAll('.pagina')].length === arrBtn[numero].length + ([...document.querySelectorAll('.pagina')].some(el => el.classList.contains('ultimaPag'))) ? 1 : 0) {
    ful && ful();
    return};
  
  let oldArr = sottoArrCur
  sottoArrCur = numero;
  const numeriPagina = arrBtn[sottoArrCur].join('');
  ultimaPag = `...<button class="pagina ultimaPag" onclick="cambiaPg(${pagineTotali})">${pagineTotali}</button>`
  document.querySelector('.containerPag').classList.add(`scorri-${oldArr > sottoArrCur ? '1' : '2'}`)

  setTimeout(function () {

  document.querySelector('.containerPag').innerHTML = '';

  if(sottoArrCur === 0 && sottoArrCur === arrBtn.length-1 ) {
    document.querySelector('.containerPag').insertAdjacentHTML('afterbegin',numeriPagina)
  }

  if(sottoArrCur === 0 && arrBtn.length > 1){
    document.querySelector('.containerPag').insertAdjacentHTML('afterbegin',numeriPagina + 
    `<button class="freccePaginazione paginazNext" onclick="aggiornaPagineVisibili(sottoArrCur+1)"><i class="fa-solid fa-chevron-right"></i></button>`+ultimaPag
    );
  }

  if(sottoArrCur > 0 && sottoArrCur < arrBtn.length-1) {
    document.querySelector('.containerPag').insertAdjacentHTML('afterbegin',
    `<button class="freccePaginazione paginazBack" onclick="aggiornaPagineVisibili(sottoArrCur-1)"><i class="fa-solid fa-chevron-left"></i></button>`
    + numeriPagina + `
    <button class="freccePaginazione paginazNext" onclick="aggiornaPagineVisibili(sottoArrCur+1)"><i class="fa-solid fa-chevron-right"></i></button>`+ultimaPag
    );
  }

  if(sottoArrCur !== 0 && sottoArrCur === arrBtn.length-1 ) {
    document.querySelector('.containerPag').insertAdjacentHTML('afterbegin',
    `<button class="freccePaginazione paginazBack" onclick="aggiornaPagineVisibili(sottoArrCur-1)"><i class="fa-solid fa-chevron-left"></i></button>`
    + numeriPagina);
  }

    document.querySelector('.containerPag').classList.remove(`scorri-${oldArr > sottoArrCur ? '1' : '2'}`);
    ful && ful();
  },200)
  
}

const aggiornaPaginazione = function (pag) {

  pagCur = pag;
  arrBtn = Array.from({length: pagineTotali}, (el,i) => i+1)
  .map((el =>`<button class="pagina" onclick="cambiaPg(${el})">${el}</button>`)).reduce((acc,cur) => {
    if (acc.length === 0 || acc[acc.length - 1].length === 5) {
    acc.push([cur]);
  } else {
    acc[acc.length - 1].push(cur);
  }
  return acc;
  }, []);

  
  if(arrBtn[0].length <= 1) {
    document.querySelector('.containerPag').innerHTML = '';
    return;
  }
  
  let numero = arrBtn.indexOf(arrBtn[arrBtn.findIndex(el=> el.includes(`<button class="pagina" onclick="cambiaPg(${pag})">${pag}</button>`))]);
  
  new Promise (function ( ful, rej) {
    aggiornaPagineVisibili(numero, ful);}).then(() =>
    [...document.querySelectorAll('.pagina')].forEach((el,i) => {
      console.log('CORRENTE' ,pagCur, 'PAGINE', el.textContent);
      return +el.textContent === pagCur ? el.style.color = 'black' : el.style.color = 'darkred'}))

}

document.querySelector('.btnVetrinaIniziale').addEventListener('mouseenter', function () {
  document.querySelector('.piccolaSpie').style.width = '300px'
})
document.querySelector('.btnVetrinaIniziale').addEventListener('mouseleave', function () {
  document.querySelector('.piccolaSpie').style.width = '0px'
})

document.querySelector('.btnVetrinaIniziale').addEventListener ('click' , function () {
  const pulsante = document.querySelector('.btnVetrinaIniziale');
  pulsante.classList.add('avantiVel');
  setTimeout(function () {
    pulsante.classList.remove('avantiVel')
    pulsante.style.left = '40px'
    pulsante.classList.add('scuotiMen')
  }, 1500)
  setTimeout(function () {
    pulsante.classList.remove('scuotiMen')
    pulsante.classList.add('dietroLen')
    pulsante.style.left = '40px'
  }, 2500)
  setTimeout(function () {
    pulsante.classList.add('hidden-3');
    pulsante.style.left = ''
    pulsante.classList.remove('dietroLen')
  },5000)
  cambiaVetrina( undefined, true);
})


document.querySelector('.stikymenu').addEventListener('click', function () {
  window.location.href = '/'
})


const upperLista = function () {
  const categorie = document.querySelectorAll('.categoriaarticolo');
  categorie.forEach(c => c.textContent = c.textContent.trim()[0].toUpperCase() + c.textContent.trim().slice(1));
  const titoli = document.querySelectorAll('.nomearticolo');
  titoli.forEach(c => c.textContent = c.textContent.trim()[0].toUpperCase() + c.textContent.trim().slice(1))
}

upperLista()

const ALLIN_ART_VETRINA = -50;
const vetrinaEl = document.querySelector('.vetrina');
let pulsanti = [...document.querySelectorAll('.btn_vet')];
let vetrinaAuto;
const listaEl = document.querySelector('.contenitoreArticoli');
const headerEl = document.querySelector('header');
const menuArticoliEl = document.querySelector('.div-menuarticoli');
let funzioneTasti;
let query = {
  category: null,
  sort: null,
  keyWord: null,
};



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
  let curArt = 2;
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
   
      const LIMITE = this === document.querySelector('.next-pg') ? (totale + 2) : 1;
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

fnVetrina(articoliInVetrinaArr.length)

// ORDINA PER ORDINE ALFABETICO


// const funzioneSort = function (nonrev = true, nonNum = true) {

//   const markup = articoliArr.toSorted((a, b) => {
//     if(!nonNum) { return nonrev ? b.inserimento - a.inserimento : a.inserimento - b.inserimento} 
//     else{
//     if(!nonrev) {
//       if (a.titolo.trim().toUpperCase() > b.titolo.trim().toUpperCase()) return -1;
//       if (a.titolo.trim().toUpperCase() < b.titolo.trim().toUpperCase()) return 1
//     } else{
//       if (a.titolo.trim().toUpperCase() > b.titolo.trim().toUpperCase()) return 1;
//       if (a.titolo.trim().toUpperCase() < b.titolo.trim().toUpperCase()) return -1
//     }}}).map(el => `    
//     <div class="articoli container" data-id="${el.id}" data-descrizione="${el.descrizioneLunga}" data-inserimento="${el.inserimento}">
//     <figure class="figure-img">
//       <img class="img_art" src="${el.img}"alt="${el.titolo}">
//     </figure>
//     <div class="articoli_label">
//       <h4 class="nomearticolo">${el.titolo}</h4>
//       <p class="categoriaarticolo">${el.tipo}</p>
//     </div>
//     </div>`).join('')

//     document.querySelector('.contenitoreArticoli').innerHTML = '';
//     document.querySelector('.contenitoreArticoli').insertAdjacentHTML('afterbegin', markup)

//     upperLista()
// }


// document.getElementById('sortAl').addEventListener('click', funzioneSort)
// document.getElementById('sortRevAl').addEventListener('click', function() {
//   funzioneSort(false)
// })
// document.getElementById('sortNum').addEventListener('click', function () {
//   funzioneSort(true, false)
// })
// document.getElementById('sortRevNum').addEventListener('click', function () {
//   funzioneSort(false, false)
// })

document.getElementById('sortAl').addEventListener('click', function () {
  // cambiaPg(1,undefined,'a-z',undefined)
  cambiaPg(1,undefined,'a-z',undefined)
})

document.getElementById('sortRevAl').addEventListener('click', function() {
  cambiaPg(1,undefined,'z-a',undefined)
})

document.getElementById('sortNum').addEventListener('click', function () {
  cambiaPg(1,undefined,'lastu',undefined)
})

document.getElementById('sortRevNum').addEventListener('click', function () {
  cambiaPg(1,undefined,'firstu',undefined)
})

const cambiaVetrina = function (e, iniziale = false) {
  if(articoliArr.length === 1) return;
  document.removeEventListener('keydown', funzioneTasti);
  clearInterval(vetrinaAuto);
  vetrinaEl.classList.add('hidden-1');
  document.body.scrollIntoView({ behavior: 'smooth' });

  new Promise (function (fulfill, reject) {
    setTimeout(function () {
      fulfill()
    }, 800)
  }).then(function () {
    const markup = (iniziale ? vetrinaIniziale : articoliArr).map(el => `<div class="articoloInVetrina transitionclass sfocArtVet" data-id="${el.id}" data-descrizione="${el.descrizioneLunga}" data-inserimento="${el.inserimento}" data-descrizioneBreve = "${el.tipo}">

    <img class="immagineInVetrina" src="${el.img}" alt="${el.titolo}">

    </div>`)
    .join('') 
    + (iniziale ? vetrinaIniziale : articoliArr).map(el => `<div class="articoloInVetrina transitionclass sfocArtVet" data-id="${el.id}" data-descrizione="${el.descrizioneLunga}" data-inserimento="${el.inserimento}" data-descrizioneBreve = "${el.tipo}">

    <img class="immagineInVetrina" src="${el.img}" alt="${el.titolo}">

    </div>`)
    .join('') 
    + `<button class="btn_vet next-pg hidden-4"><i class="fa-solid fa-arrow-right"></i></button><button class="btn_vet prev-pg hidden-4"><i class="fa-solid fa-arrow-left"></i></button>`;

  vetrinaEl.innerHTML = '';
  vetrinaEl.insertAdjacentHTML('afterbegin', markup)
  aggiornaAllArr()
  pulsanti = [...document.querySelectorAll('.btn_vet')];
  fnVetrina(articoliInVetrinaArr.length);
  
  if(!iniziale) document.querySelector('.btnVetrinaIniziale').classList.remove('hidden-3');
  // if(!iniziale) document.querySelector('.btnVetrinaIniziale').style.animation = 'example4 5s ease-in-out forwards';

  vetrinaEl.classList.remove('hidden-1')
  }) 
};

document.getElementById('mettiInVet').addEventListener('click', cambiaVetrina)

// RICERCA
document.getElementById('shopSubmit').addEventListener('click', function (e) {
  const keyword = document.getElementById('shopRicerca').value;
  document.getElementById('shopRicerca').value = '';
  const categorie = document.querySelectorAll('.vocimenu');
  categorie.forEach((el) =>  el.classList.remove('selVociMenu'));
  cambiaPg(1,undefined,undefined,keyword)
})


const mostraDetProdotto = function (e, vet = false) {

  const cont = document.querySelector('.magnify-wrapper2');
  const markup2 = ` <div id="lenteIngrandimento"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
  <img
    src="${articoliTotali.find(el => el.id === (vet ? +e.target.closest('.articoloInVetrina').dataset.id : +e.target.closest('.articoli').dataset.id)).img}"
    id="main-img2" />`;
  cont.innerHTML = '';
  cont.insertAdjacentHTML('afterbegin', markup2);


  const container = document.querySelector('.magnify-wrapper');
  container.innerHTML= '';
  const img = `
  <img
  src="${articoliTotali.find(el => el.id === (vet ? +e.target.closest('.articoloInVetrina').dataset.id : +e.target.closest('.articoli').dataset.id)).img}"
  id="main-img" />
  <div id="large-img" class="largeImg" style = "background: url(${articoliTotali.find(el => el.id === (vet ? +e.target.closest('.articoloInVetrina').dataset.id : +e.target.closest('.articoli').dataset.id)).img}) no-repeat #fff"></div>`;
  container.insertAdjacentHTML('afterbegin', img);

  menuArticoliEl.scrollIntoView({ behavior: 'smooth' })

  document.getElementById('lenteIngrandimento').addEventListener('click', function (e) {
    if(e.target.closest('#lenteIngrandimento')) {
      document.getElementById('large-img').classList.add('largeImg')
    }
    })

  const contenitoreTit = document.querySelector('.caratteristicheProd');
  contenitoreTit.innerHTML = '';
  const markupTit = `<h4 class="titoloArticolo">${articoliTotali.find(el => el.id === (vet ? +e.target.closest('.articoloInVetrina').dataset.id : +e.target.closest('.articoli').dataset.id)).titolo}</h4>`
  contenitoreTit.insertAdjacentHTML('afterbegin', markupTit);

  const containerRigaInf = document.querySelector('.dettagliorigaInf')
  const markup3 = `        
  <h4 class="titoloPiccolo">${articoliTotali.find(el => el.id === (vet ? +e.target.closest('.articoloInVetrina').dataset.id : +e.target.closest('.articoli').dataset.id)).titolo}</h4>
  <p class="descrizioneLunga">${articoliTotali.find(el => el.id === (vet ? +e.target.closest('.articoloInVetrina').dataset.id : +e.target.closest('.articoli').dataset.id)).descrizioneLunga}</p>`
  containerRigaInf.innerHTML = '';
  containerRigaInf.insertAdjacentHTML("afterbegin", markup3)

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
    cambiaPg(1,`${selezionato.dataset.cat}`,null,null);
    const categorie = menu.querySelectorAll('.vocimenu');
    categorie.forEach((el) => el === selezionato ? el.classList.add('selVociMenu') : el.classList.remove('selVociMenu'));
    menu.scrollIntoView({behavior: 'smooth'})
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
    // xperc = (x / imgWidth) * 200,
    // yperc = (y / imgHeight) * 150;
    xperc = (x / imgWidth) * 100,
    yperc = (y / imgHeight) * 100;

    original.style.opacity = '1'
    original.style.width ="800px";
    original.style.height="500px"
    magnified.style.opacity = '1'
    // document.querySelector('.magnify-wrapper3').querySelector('img').style.width = "800px";
    // document.querySelector('.magnify-wrapper3').querySelector('img').style.height = "500px";
  // Add some margin for right edge
  if (x > 0.01 * imgWidth) {
    xperc += 0.15 * xperc;
  }

  // Add some margin for bottom edge
  if (y >= 0.01 * imgHeight) {
    yperc += 0.15 * yperc;
  }

  // Set the background of the magnified image horizontal
  style.backgroundPositionX = xperc - 9 + '%';
  // Set the background of the magnified image vertical
  style.backgroundPositionY = yperc - 9 + '%';

  // Move the magnifying glass with the mouse movement.
  style.left =  -0 + 'px';
  style.top =  -0 + 'px';
}


document.getElementById('zoomDaZoom').addEventListener('click', function (e) {
  zoomImmagine(e);
  document.querySelectorAll('.overlay').forEach(el => {
    if(!el.classList.contains('overlayClass')) {el.classList.add('overlayClass')}
  })
  document.getElementById('large-img').style.background = `url(${e.target.closest('#zoomDaZoom').querySelector('img').src}) no-repeat #fff`
  document.querySelector('.overlay').scrollIntoView({behavior: 'instant'})
  // document.querySelector('.magnify-wrapper').scrollIntoView({behavior: 'smooth'});
  document.body.style.overflow = 'hidden'
  setTimeout(function () {
    // document.querySelector('.sinistra').classList.remove('clipsinistra');
    document.getElementById('zoom').addEventListener(
    'mouseenter', zoomImmagine, false);
    document.getElementById('zoom').addEventListener(
    'mousemove', zoomImmagine, false);
  }, 0)
 
})



 const chiudiOverlay = function () {

 document.addEventListener('keydown', function (e) {
    if(e.key === 'Escape') {
      document.querySelectorAll('.overlay').forEach(el => el.classList.remove('overlayClass'));
      document.getElementById('zoom').removeEventListener(
        'mouseenter', zoomImmagine, false);
        document.getElementById('zoom').removeEventListener(
        'mousemove', zoomImmagine, false);
      menuArticoliEl.scrollIntoView({behavior: 'instant'})
      document.body.style.overflow = 'auto'; 
  }
  });

  document.querySelector('.overlay').addEventListener('click', function (e) {
    if(!e.target.closest('.magnify-wrapper') && !e.target.closest('.contenitoreLateraleImg')) {
    document.querySelectorAll('.overlay').forEach(el => el.classList.remove('overlayClass'));
    document.getElementById('zoom').removeEventListener(
      'mouseenter', zoomImmagine, false);
      document.getElementById('zoom').removeEventListener(
      'mousemove', zoomImmagine, false);
      menuArticoliEl.scrollIntoView({behavior: 'instant'})
    document.body.style.overflow = 'auto';  
    }
  })

  document.querySelector('.listaImmagini').addEventListener('click', function (e) {
    if(e.target.closest('.figImmaginiListaLat')) {

      document.getElementById('large-img').style.background = `url(${e.target.src}) no-repeat #fff` 
    }
  })
}

chiudiOverlay()




const fnImmaginiAlt = function () {

  let listaImgAlt = document.querySelectorAll('.figImmaginiListaLat');
 
  let curImg = 0;
  let maxImg = listaImgAlt.length - 1;
  const dotContainer = document.querySelector('.dots')

  const createDots = function () {
    dotContainer.innerHTML = '';
    listaImgAlt.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };
  
  const activateDot = function (img) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide ="${img}"]`)
      .classList.add('dots__dot--active');
  };

  createDots();

  const goToImg = function (img) {
  listaImgAlt.forEach((el,i) => el.style.transform = `translateY(${100 *( i - img )}%)`);
  activateDot(img)
  };

  goToImg(0);

  const nextImg = function () {
    if(curImg === maxImg) {
      curImg = 0
    } 
    else {
      curImg++
    }
    goToImg(curImg)
  };

  const prevImg = function () {
    if(curImg === 0) {
      curImg = maxImg
    }
    else {
      curImg--
    }
    goToImg(curImg)
  };

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curImg = Number(e.target.dataset.slide);

      goToImg(curImg);
    }
  });

  const frecceImgAltfn = function (e) {
    e.key === 'ArrowUp' && nextImg();
    e.key === 'ArrowDown' && prevImg();
  };

  document.removeEventListener('keydown', frecceImgAltfn);

  document.querySelector('.buttonSu').removeEventListener('click', nextImg);
  document.querySelector('.buttonGiu').removeEventListener('click',prevImg)

  document.querySelector('.buttonSu').addEventListener('click', nextImg);
  document.querySelector('.buttonGiu').addEventListener('click', prevImg)

  document.addEventListener('keydown', frecceImgAltfn);

}

fnImmaginiAlt();



const callArt = async function (pag, category, sort, keyWord ) {
  try{
  console.log('QUERY',query);
  let url = "{% url 'shop' %}" + `?page=${pag}&data_only=true`;
   url += category ? `&category=${category}`:'';
   url += sort ? `&sort=${sort}`:'';
   url += keyWord ? `&keyWord=${keyWord}`:'';
  console.log('URL', url);
  const res = await fetch(url);
  console.log('RES',res);
  const data = await res.json();
  if(data.message) throw new Error ("  Ci dispiace 😥, non ci sono prodotti corrispondenti ai tuoi criteri di ricerca. Prova qualcos'altro! 😉 ");

  ({pagine_totali : pagineTotali} = data);
  const {articoli} = data;
  query.category = data.query.category;
  query.sort = data.query.sort;
  query.keyWord = data.query.keyWord;
  console.log(query);
  return articoli}
  catch (err){
    throw err
  }
}

const cambiaPg = async function (pag, category = query.category, sort = query.sort, keyWord = query.keyWord) {
  try{
  const articoli = await callArt(pag, category, sort, keyWord);
  let markup = articoli.map(el => `    
  <div class="articoli container" data-id="${el.id}" data-descrizione="${el.descrizione}" data-inserimento="${el.creation}">
  <figure class="figure-img">
    <img class="img_art" src="{% get_media_prefix %}${el.url_img}"alt="${el.titolo}">
  </figure>
  <div class="articoli_label">
    <h4 class="nomearticolo">${el.titolo}</h4>
    <p class="categoriaarticolo">${el.descrizione_breve}</p>
  </div>
  </div>`).join('');
  document.querySelector('.contenitoreArticoli').classList.add('hidden-3')
  setTimeout(function () {
    document.querySelector('.contenitoreArticoli').innerHTML = '';
    document.querySelector('.contenitoreArticoli').insertAdjacentHTML('afterbegin', markup);
    document.querySelector('.contenitoreArticoli').classList.remove('hidden-3')
    aggiornaAllArr();
    upperLista();
    aggiornaPaginazione(pag);
    document.querySelector('#mettiInVet').style.display = articoliArr.length <=1 ? 'none': '';
    document.querySelector('.cnt-vocimenu').scrollIntoView ({behavior: 'smooth'})
  }, 400)
  } catch (err){
    document.querySelector('.contenitoreArticoli').innerHTML = '';
    document.querySelector('.contenitoreArticoli').insertAdjacentText('afterbegin', err.message);
  }
}


