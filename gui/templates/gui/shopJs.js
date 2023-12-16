{% load static %}

config.rivelatoreSezioni()
const ALLIN_ART_VETRINA = -50;

// VETRINA

const fnVetrina = function () {
  let curArt = 6;
  let articoliVetrinaArr = [...document.querySelectorAll('.articoloInVetrina')]
  const maxArt = articoliVetrinaArr.length-1

  articoliVetrinaArr.forEach((el,i, arr) => {
   el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
   arr[6].classList.remove('sfocArtVet')
    });
    

  document.querySelector('.next-pg').addEventListener('click', function () {
    curArt++
    if (curArt === 16) {
      curArt -= 10;
      articoliVetrinaArr.forEach((el, i) => {
      el.classList.remove('transitionclass');})
      let curEl;
      let translate;
      articoliVetrinaArr.forEach((el, i, arr) => {
      el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt + 1))}%) scale(0.5)`;
      if(i === curArt - 1) {
        translate = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt + 1))}%) scale(1)`;
        curEl = el;}
     }); 

     curEl.style.transform = translate;
     curEl.classList.remove('sfocArtVet');
     setTimeout(function () {
      articoliVetrinaArr.forEach(el=> el.classList.add('transitionclass'));
      articoliVetrinaArr.forEach((el,i, arr) => {
        if(i === curArt) {el.classList.remove('sfocArtVet')} else {el.classList.add('sfocArtVet')}
        el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
         });
     }, 100)
    
    } else{
    articoliVetrinaArr.forEach((el,i, arr) => {
      console.log('riga trentanove', i);
      if(i === curArt) {el.classList.remove('sfocArtVet')} else {el.classList.add('sfocArtVet')}
      el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
       });
      }
  })


  document.querySelector('.prev-pg').addEventListener('click', function () {
    curArt--
    if (curArt === 5) {
      curArt += 10;
      articoliVetrinaArr.forEach((el, i) => {
      el.classList.remove('transitionclass');})
      let curEl;
      let translate;
      articoliVetrinaArr.forEach((el, i, arr) => {
      el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt - 1))}%) scale(0.5)`;
      if(i === curArt + 1) {
        translate = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt - 1))}%) scale(1)`;
        curEl = el;}
     }); 

     curEl.style.transform = translate;
     curEl.classList.remove('sfocArtVet');
     setTimeout(function () {
      articoliVetrinaArr.forEach(el=> el.classList.add('transitionclass'));
      articoliVetrinaArr.forEach((el,i, arr) => {
        if(i === curArt) {el.classList.remove('sfocArtVet')} else {el.classList.add('sfocArtVet')}
        el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
         });
     }, 100)
    
    } else{
    articoliVetrinaArr.forEach((el,i, arr) => {
      console.log('riga trentanove', i);
      if(i === curArt) {el.classList.remove('sfocArtVet')} else {el.classList.add('sfocArtVet')}
      el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
       });
      }
  })

  // document.querySelector('.prev-pg').addEventListener('click', function () {
  //   if(curArt === 0) {
  //     curArt = maxArt
  //   } else {
  //     curArt--}

  //   articoliVetrinaArr.forEach((el,i, arr) => {
  //     if(i === curArt) {el.classList.remove('sfocArtVet')} else {el.classList.add('sfocArtVet')}
  //     el.style.transform = `translateX(${ALLIN_ART_VETRINA + (100 * (i - curArt))}%) ${ i !== curArt ? 'scale(0.5)' : ''}`;
  //      });
  // })
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


// {header:[art1, art2, art3]}