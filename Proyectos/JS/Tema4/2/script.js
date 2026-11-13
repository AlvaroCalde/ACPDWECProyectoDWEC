const cultura = document.querySelector("#cultura");

const parrafo = cultura.querySelector("p");
const enlace = cultura.querySelector(".destacado");

const elementoDobleClase = document.querySelector(".resumen.importante");

const enlaceGlobal = document.querySelector(".destacado");
const enlaceLocal = cultura.querySelector(".destacado");

console.log(cultura);
console.log(parrafo);
console.log(enlace);
console.log(elementoDobleClase);
console.log("Enlace global:", enlaceGlobal.getAttribute("href"));
console.log("Enlace local:", enlaceLocal.getAttribute("href"));

console.log("¿Son el mismo enlace?", enlaceGlobal === enlaceLocal);
