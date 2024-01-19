
{% load static %}



let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
console.log(date, currYear, currMonth);

const currentDate = document.querySelector(".current-date");
const daysEl = document.querySelector(".days");
const iconePrevNext = document.querySelectorAll('.icons span');



const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];

const renderCalendar = () => {
  let firstGiornoMese = new Date(currYear, currMonth, 1).getDay(),
  ultimoGiornoMeseScorso = new Date (currYear, currMonth, 0).getDate(), 
  lastDateMonth = new Date(currYear, currMonth +1, 0).getDate(),
  ultimoGiornoMeseCorrente = new Date (currYear, currMonth, lastDateMonth).getDay();

   
  currentDate.innerText = `${months[currMonth]} ${currYear}`;

  let markupLi = '';

  for(let i = firstGiornoMese; i > 0; i--) {
    markupLi += `<li class="inactive hidden-3">${ultimoGiornoMeseScorso - i + 1}</li>`
  }

  for (let i = 1; i <= lastDateMonth; i++) {
    let oggi = date.getDate() === i && currMonth === date.getMonth() && currYear === date.getFullYear() ? 'active' : '';
    markupLi += `<li class="${oggi} hidden-3" data-day="${i}">${i}</li>`
  }

  for (let i = ultimoGiornoMeseCorrente; i < 6; i++) {
    markupLi += `<li class="inactive hidden-3">${i - ultimoGiornoMeseCorrente + 1 }</li>`
  }

  
  daysEl.innerHTML = '';
  daysEl.insertAdjacentHTML('afterbegin', markupLi);
  daysEl.querySelectorAll('li').forEach((el) => setTimeout(function () {
    el.classList.remove('hidden-3')}, 1))
  
}

renderCalendar()


iconePrevNext.forEach(icon => icon.addEventListener('click', function () {
  currMonth = icon.id ==='prev' ? currMonth-1 : currMonth+1;

  if(currMonth < 0 || currMonth > 11) {
    let date2 = new Date(currYear, currMonth);
    currMonth = date2.getMonth();
    currYear = date2.getFullYear();
  } else {
    date = new Date()
  }

  renderCalendar();
}))


document.querySelector('.stikymenu').addEventListener('click', function () {
  window.location.href = '/'
});

const arrEventsDate = [19, 18, 5, 28, 21, 25];
arrEventsDate.forEach(el => {
  if(el >= date.getDate()) {daysEl.querySelector(`[data-day="${el}"]`).style.color = 'red'} else {return}})