const tablero = document.getElementById('tablero');
let cartas = Array.from(tablero.children);

// Barajar cartas
function barajar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

tablero.innerHTML = '';
cartas = barajar(cartas);
cartas.forEach(carta => {
  // Asignar color de la parte trasera
  carta.querySelector('.atras').style.backgroundColor = carta.dataset.color;
  tablero.appendChild(carta);
});

let primeraCarta = null;
let segundaCarta = null;
let bloqueado = false;

cartas.forEach(carta => {
  carta.addEventListener('click', () => {
    if (bloqueado || carta === primeraCarta || carta.classList.contains('volteada')) return;

    carta.classList.add('volteada');

    if (!primeraCarta) {
      primeraCarta = carta;
    } else {
      segundaCarta = carta;
      bloqueado = true;

      if (primeraCarta.dataset.color === segundaCarta.dataset.color) {
        primeraCarta = null;
        segundaCarta = null;
        bloqueado = false;
      } else {
        setTimeout(() => {
          primeraCarta.classList.remove('volteada');
          segundaCarta.classList.remove('volteada');
          primeraCarta = null;
          segundaCarta = null;
          bloqueado = false;
        }, 1000);
      }
    }
  });
});


// Seleccionamos input, botón y mensaje
const colorInput = document.getElementById('colorInput');
const comprobarBtn = document.getElementById('comprobarBtn');
const mensaje = document.getElementById('mensaje');

// Función que se llama al hacer click
comprobarBtn.addEventListener('click', () => {
  const valor = colorInput.value.trim().toLowerCase(); // Quitamos espacios y pasamos a minúsculas

  if(valor === 'blanco'){
    mensaje.textContent = "¡Acertaste el color del profesor Pistolas!";
    mensaje.style.color = 'green';
  } else {
    mensaje.textContent = "No es ese color, sigue intentando.";
    mensaje.style.color = 'red';
  }
});
