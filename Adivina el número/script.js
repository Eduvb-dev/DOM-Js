"use strict";
// Variables de números y arrays con frases
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
const tooHighQuotes = [
  "Te has pasado la parada",
  "Bajate 2 tonitos",
  "Has apuntado demasiado alto",
  "Pon la vista en el suelo",
  "Bajate del carro",
  "Vuelve hacía atras!",
  "Te has dejado una moneda!",
];
const tooLowQuotes = [
  "Subeme la radio, que esta es mi canción",
  "Necesitas subir más!",
  "Hacia arriba, como ESPAÑA",
  "Necesitas más nivel",
  "Apunta alto, hacia los cielos!",
  "La libertad espera en la cima",
  "Sigue caminando",
];
// Ventana emergente componentes
const gear = document.querySelector(".gear");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeBtn = document.querySelector(".close-modal");

// Funciones querySelector : Mensajes y puntuación
const message = function (mess) {
  document.querySelector(".message").textContent = mess;
};
const displayScore = function (score2) {
  document.querySelector(".score").textContent = score2;
};

// Funciones ocultamiento y aparición de ventanas
const openGear = function () {
  if (modal.classList.contains("hidden")) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  }
};
const closeOverlay = function () {
  if (!modal.classList.contains("hidden")) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
};
// Funciones de los eventListener : Comprobar número al clickear y volver a jugar
let again = function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  message("Que número podra ser 🥴");
  document.querySelector(".number").textContent = "?";
  displayScore(score);
  document.querySelector(".guess").value = null;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
};
let check = function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    message("Necesito un número 😅");
  } else if (guess === secretNumber) {
    message("Lo conseguiste !");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = score;
    }
  } else if (guess > secretNumber) {
    if (score > 1) {
      message(tooHighQuotes[Math.floor(Math.random() * tooHighQuotes.length)]);
      score--;
      displayScore(score);
    } else {
      displayScore(0);
      message("Te quedaste sin intentos , vuelve a empezar !");
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      message(tooLowQuotes[Math.floor(Math.random() * tooLowQuotes.length)]);
      score--;
      displayScore(score);
    } else {
      displayScore(0);
      message("Te quedaste sin intentos , vuelve a empezar !");
    }
  }
};
/*Lógica del juego*/
// Comprobar si es correcto
document.querySelector(".check").addEventListener("click", check);
// Volver a jugar
document.querySelector(".again").addEventListener("click", again);

/*Ventanas emergentes*/
// Abrir opciones
gear.addEventListener("click", openGear);
// Cerrar ventana en click en boton o fuera de el
closeBtn.addEventListener("click", closeOverlay);
overlay.addEventListener("click", closeOverlay);
// Cerrar ventana cuando se pulse la tecla escape este evento lo escuchara toda la página
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeOverlay();
  }
});

// Texto de la página : Título , entre 2 números y opciones
document.querySelector(".title-game").textContent = "Adivina el número";
document.querySelector(".between").textContent = "(Entre 1 y 20)";
// document.querySelector("options").textContent=
