

config.rivelatoreSezioni()

const x = async function () {
  try {
   const y = await fetch(`{% url 'detail' %}?id=${id}`)
   console.log(y);
  } catch {
    console.log('errore');
  }
}
