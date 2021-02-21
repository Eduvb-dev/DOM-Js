"use strict";

let currentScore0 = 0;
let activePlayer = 0;
const scores = [0, 0];

// Marcadores
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const diceImage = document.querySelector(".dice");

// Background
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// scores
const scoreBelow0 = document.querySelector("#current--0");
const scoreBelow1 = document.querySelector("#current--1");

// botones
const newBtn = document.querySelector(".btn--new");
const rollBtn = document.querySelector(".btn--roll"); // !
const holdBtn = document.querySelector(".btn--hold");

// Funcion para la inicialización del programa
const ini = function () {
  holdBtn.disabled = false;
  rollBtn.disabled = false;
  diceImage.classList.add("hidden");
  scores[0] = 0;
  scores[1] = 0;
  scoreBelow0.textContent = 0;
  scoreBelow1.textContent = 0;
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0 = 0;
  activePlayer = 0;
  if (player0.classList.contains("player--winner")) {
    player0.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
  } else if (player1.classList.contains("player--winner")) {
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
  }
};

ini();

// Cambio de color
const changeColor = function () {
  if (activePlayer == 0) {
    player0.classList.remove("player--active");
    player1.classList.add("player--active");
  } else if (activePlayer == 1) {
    player1.classList.remove("player--active");
    player0.classList.add("player--active");
  }
};

// Victoria !
const victoryScreen = function () {
  if (activePlayer == 0) {
    player0.classList.remove("player--active");
    player1.classList.remove("player--active");
    player0.classList.add("player--winner");
  } else if (activePlayer == 1) {
    player1.classList.remove("player--active");
    player0.classList.remove("player--active");
    player1.classList.add("player--winner");
  }
};

// Lógica del juego
rollBtn.addEventListener("click", function () {
  // Variable random
  const dice = Math.trunc(Math.random() * 6) + 1;
  // Cargamos la imagen que corresponde con el dado
  diceImage.classList.remove("hidden");
  diceImage.src = `images/dice-${dice}.png`;
  // Comprueba que la tirada No es un uno y si lo es , cambia de jugador.
  if (dice != 1) {
    currentScore0 += dice;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore0;
  } else if (dice == 1 && activePlayer == 0) {
    scoreBelow0.textContent = 0;
    currentScore0 = 0;
    changeColor();
    activePlayer = 1;
  } else if (dice == 1 && activePlayer == 1) {
    scoreBelow1.textContent = 0;
    currentScore0 = 0;
    changeColor();
    activePlayer = 0;
  }
});

// Pasa la puntuación al score global , el control al otro player y deja el contador a 0
// Si se llega a 100 se gana el juego
holdBtn.addEventListener("click", function () {
  if (activePlayer == 0) {
    scores[0] += currentScore0;
    score0.textContent = scores[0];
    currentScore0 = 0;
    scoreBelow0.textContent = 0;
    changeColor();
    if (scores[0] >= 100) {
      victoryScreen();
      diceImage.classList.add("hidden");
      holdBtn.disabled = true;
      rollBtn.disabled = true;
    }
    activePlayer = 1;
  } else if (activePlayer == 1) {
    scores[1] += currentScore0;
    score1.textContent = scores[1];
    currentScore0 = 0;
    scoreBelow1.textContent = 0;
    changeColor();
    if (scores[1] >= 100) {
      victoryScreen();
      diceImage.classList.add("hidden");
      holdBtn.disabled = true;
      rollBtn.disabled = true;
    }
    activePlayer = 0;
  }
});

// Volver a jugar , deja todas las cosas en el valor original
newBtn.addEventListener("click", ini);
