"use strict";
const modal = document.querySelector(".modal");
const overLay = document.querySelector(".overlay");
const btnShowModal = document.querySelectorAll(".show-modal");
const btnCloseModal = document.querySelector(".close-modal");
console.log(btnShowModal);
// quitar clase hidden
const hiddenOut = function () {
  modal.classList.remove("hidden");
  overLay.classList.remove("hidden");
  // sin punto
};
// volver a ocultar
const hiddenOn = function () {
  modal.classList.add("hidden");
  overLay.classList.add("hidden");
  // sin punto
};

// añadir clicky clicky a todos los elementos seleccionados que son iguales con un for
for (let i = 0; i < btnShowModal.length; i++) {
  btnShowModal[i].addEventListener("click", hiddenOut);
}
btnCloseModal.addEventListener("click", hiddenOn);
//al crearse un overlay podemos usarlo para al clickear en el
// (aka todo lo de fuera) que se cierre la pestaña
overLay.addEventListener("click", hiddenOn);

// modal.style.display = "block" normal
// modal.style.display = "none" ocultar elemento

document.addEventListener("keydown", function (e) {
  // info generalconsole.log(e);
  console.log(e.key); // Nombre de la tecla
  if (e.key === "Escape") {
    if (!modal.classList.contains("hidden")) {
      hiddenOn(); // Si que hay que copiar el parametro
    }
  }
});
