//ver en F12 Application>Storage>Cookies
document.cookie="personaje=Alex; path=/";
document.cookie="personaje=Alex; expires=Fri, 31 Dec 2027 23:59:59";

///////////////////////////////////////////////////////////////////////

localStorage.setItem("practica_nombre", "Álvaro");
localStorage.setItem("practica_monedas", 99);

let nombre=localStorage.getItem("practica_nombre");
let monedas=localStorage.getItem("practica_monedas");

console.log("Cantidad de monedas: "+ monedas);
console.log(typeof monedas);
let mas_monedas=Number(localStorage.getItem("practica_monedas"))+10;
console.log("cantidad de monedas: "+mas_monedas);

localStorage.removeItem("practica_nombre");
localStorage.removeItem("practica_monedas")

if (nombre !== null) { console.log(nombre); }
if (monedas !== null) { console.log(monedas); }

///////////////////////////////////////////////////////////////////////