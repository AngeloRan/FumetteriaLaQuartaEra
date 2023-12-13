{% load static %}

config.rivelatoreSezioni()

const x = async function () {
  try {
   const y = await fetch(`{% url 'detail' %}?id=${id}`)
   console.log(y);
  } catch {
    console.log('errore');
  }
}

var options1 = {
  width: 300,
  zoomWidth: 450,
  offset: {vertical: 0, horizontal: 10},
  scale: 1.1,
  // zoomPosition: "original"
};

new ImageZoom(document.getElementById("img-container"), options1);
