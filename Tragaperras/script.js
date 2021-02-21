"use strict";
// Variables
let counter,
  counter2,
  aux1,
  aux2,
  aux3,
  coins,
  counterStartMoney,
  startTime,
  diference;
let arrayImagesTable = [];
let arrayCoins = [];
let arrayCoinsAfterPlay = [];

// Selectores imagenes
const imgL = document.querySelector("#imgLeft");
const imgC = document.querySelector("#imgCenter");
const imgR = document.querySelector("#imgRight");
const ScoreImage = document.querySelector("#scoreImage");

// Selectores botones
const finishBtn = document.querySelector(".finish");
const playBtn = document.querySelector(".play");
const insertBtn = document.querySelector(".insert");
const recordBtn = document.querySelector(".record");

// Ventana modular
const modal = document.querySelector(".modal");
const overLay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

// Selectores puntuaciones
const coinsWon = document.querySelector("#won");
const coinsOverlay = document.querySelector("#coins");

// Arrays
const fruits1 = [
  "aguacate.png",
  "ajo.png",
  "cebolla.png",
  "pepino.png",
  "puerro.png",
  "tomate.png",
  "zanahoria.png",
];
const fruits2 = [
  "aguacate.png",
  "ajo.png",
  "cebolla.png",
  "pepino.png",
  "puerro.png",
  "tomate.png",
  "zanahoria.png",
];
const fruits3 = [
  "aguacate.png",
  "ajo.png",
  "cebolla.png",
  "pepino.png",
  "puerro.png",
  "tomate.png",
  "zanahoria.png",
];
const fruits = [
  "aguacate.png",
  "ajo.png",
  "cebolla.png",
  "pepino.png",
  "puerro.png",
  "tomate.png",
  "zanahoria.png",
];

// audios
let audioWon = new Audio("audio/poke.mp3");
let audioInsert = new Audio(`audio/sonic.mp3`);
let audioPlay = new Audio(`audio/slot.mp3`);

const audio = function (audioName) {
  audioName.currentTime = 0;
  audioName.play();
};

// Funciones

/* Apaga / enciende botones*/
const buttonOff = function (button) {
  if (!button.classList.contains("noButton")) {
    button.disabled = true;
    button.classList.add("noButton");
  }
};
const buttonOn = function (button) {
  if (button.classList.contains("noButton")) {
    button.disabled = false;
    button.classList.remove("noButton");
  }
};

/* Sacar historial*/
const hiddenOut = function () {
  modal.classList.remove("hidden");
  overLay.classList.remove("hidden");
};

/* Volver a ocultar*/
const hiddenOn = function () {
  modal.classList.add("hidden");
  overLay.classList.add("hidden");
};

/* Random */
const randomFruit = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};
/* Actualizar texto de un boton */
const textChange = function (element, newText) {
  element.textContent = newText;
};
/* Logica del sistema de puntuación*/
/* Si hay una zanahoria ([6]) entrara en la condicional de zanahoria y ganara puntos dependiendo de si hay 1 , 2 o 3
Si no hay entrada en el condicional de NO zanahoria y buscara 2 o 3 arrays iguales que NO sean zanahoria */
const gameLogic = function (array1, array2, array3) {
  if (array1 == fruits[6] || array2 == fruits[6] || array3 == fruits[6]) {
    coins++;
  }
  if (array1 == fruits[6] && array2 == fruits[6] && array3 == fruits[6]) {
    coins += 9;
    return;
  }
  if (
    (array1 == fruits[6] && array2 == fruits[6]) ||
    (array2 == fruits[6] && array3 == fruits[6]) ||
    (array1 == fruits[6] && array3 == fruits[6])
  ) {
    coins += 3;
    return;
  }

  if (fruits[6] != array3 || fruits[6] != array2 || fruits[6] != array1) {
    if (array1 == array2 || array2 == array3 || array1 == array3) {
      coins += 2;

      if (array1 == array2 && array2 == array3 && array1 == array3) {
        coins += 3;
      }
    }
  }
};

/*Carga una imagen a la fila de la tabla */
const newImageTable = function (img) {
  const rowImage = `<img src="images/${img}" id="scoreImage"/>`;
  return rowImage;
};
/* Transforma numeros aleatorios en imagenes*/
const imagesChanger = function () {
  aux1 = randomFruit(fruits1);
  aux2 = randomFruit(fruits1);
  aux3 = randomFruit(fruits1);
  imgL.src = `images/${aux1}`;
  imgC.src = `images/${aux2}`;
  imgR.src = `images/${aux3}`;
};
/* Transforma la imagen en su posición del array para hacer los calculos */
const parseImages = function (array1, array2, array3) {
  const a = array1.indexOf(aux1);
  aux1 = a;
  const b = array2.indexOf(aux2);
  aux2 = b;
  const c = array3.indexOf(aux3);
  aux3 = c;
  arrayImagesTable.push(fruits1[aux1], fruits2[aux2], fruits3[aux3]);
};
/* Tabla de puntuaciones*/
const scoreTable = function () {
  // Crea una tabla con el poder del spaguetti
  let counterPlays = 0;
  let rows = 3;
  let html = "<table><tr>";
  counter = 0;
  for (let i = 0; i < arrayImagesTable.length; i++) {
    if (counter == 0) {
      html += "<th class=tableHead>Jugada</th>";
      html += "<th class=tableHead>Antes</th>";
      html += "<th class=tableHead>Despues</th>";
      html += "<th class=tableHead>Resultado</th>";
      html += "</tr><tr>";

      counter++;
    }
    if (counter == 1) {
      html += `<td id="modalCount">${counterPlays + 1}º </td>`;
      html += `<td id="modalCoins">${arrayCoins[counterPlays]}</td>`;
      html += `<td id="modalBalance">${arrayCoinsAfterPlay[counterPlays]}</td>`;
      html += "<td>";
      counterPlays++;
      counter++;
    }
    html += `${newImageTable(arrayImagesTable[i])}`;
    let next = i + 1;
    if (next % rows == 0 && next != arrayImagesTable.length) {
      counter = 1;
      html += "</td>";
      html += "</tr><tr>";
    }
  }

  html += "</tr></table>";

  document.querySelector(".container").innerHTML = html;
};
/* Giros de las imagenes */
const spinTwoWin = function (totalTime, speed) {
  startTime = new Date().getTime();
  let interval = setInterval(function () {
    if (new Date().getTime() - startTime > totalTime) {
      clearInterval(interval);
    }
    imagesChanger();
  }, speed);
};
// Funciones asincrona / sincronas
/* Espera a que termine de girar las imagens y entonces....*/
function spinPromise() {
  return new Promise(resolve => {
    buttonOff(playBtn);
    spinTwoWin(1800, 120);
    setTimeout(() => {
      resolve();
    }, 1950);
  });
}
/* Ejecuta el programa */
async function awaitForSpin() {
  await spinPromise();
  audio(audioWon);

  buttonOn(playBtn);
  parseImages(fruits1, fruits2, fruits3);
  gameLogic(fruits1[aux1], fruits2[aux2], fruits3[aux3]);
  arrayCoinsAfterPlay.push(coins);
  scoreTable();
  textChange(coinsOverlay, coins);
  textChange(coinsWon, coins - diference);

  if (coins == 0) {
    window.alert(
      " No te quedan monedas , necesitas meter más para seguir jugando"
    );
    buttonOff(playBtn);
  }
}
/* Nuevo juego , funcion de inicio y de reset*/
const newGame = function () {
  imagesChanger();
  counter = 0;
  counter2 = 0;
  coins = 0;
  counterStartMoney = 0;
  buttonOn(insertBtn);
  buttonOff(playBtn);
  buttonOn(finishBtn);
  buttonOff(recordBtn);
  textChange(coinsOverlay, coins);
  textChange(coinsWon, coins);
  document.querySelector(".container").innerHTML = "";
  arrayCoinsAfterPlay = [];
  arrayCoins = [];
  arrayImagesTable = [];
};

/*Listeners de los botones del menu + abrir y cerrar el historial*/

insertBtn.addEventListener("click", function () {
  coins++;
  counterStartMoney++;
  textChange(coinsOverlay, coins);
  audio(audioInsert);
  if (coins > 0) {
    buttonOn(playBtn);
  }
});
playBtn.addEventListener("click", function () {
  audio(audioPlay);
  buttonOff(insertBtn);
  buttonOn(recordBtn);
  coins--;
  arrayCoins.push(coins);
  diference = coins;
  textChange(coinsOverlay, coins);
  counter2++;
  awaitForSpin();
});
finishBtn.addEventListener("click", function () {
  window.alert(
    `Has jugado un total de ${counter2} veces y has obtenido ${
      coins - counterStartMoney
    } monedas, respecto a las ${counterStartMoney} monedas de inicio`
  );
  newGame();
});

recordBtn.addEventListener("click", hiddenOut);
btnCloseModal.addEventListener("click", hiddenOn);
overLay.addEventListener("click", hiddenOn);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      hiddenOn();
    }
  }
});

// Funcion inicializadora
newGame();
