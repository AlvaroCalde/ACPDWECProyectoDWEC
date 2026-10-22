/* Ejercicio 1
console.log(navigator.language);
console.log(navigator.languages);

if(navigator.onLine){
    console.log("Hay conexión");
}else{
    console.log("No hay conexión")
}

const etiquetaHTML = document.getElementById('etiquetaCookies');

if (navigator.cookieEnabled) {
    etiquetaHTML.textContent = "Las cookies están HABILITADAS en este navegador.";
    etiquetaHTML.style.color = "green";
} else {
    etiquetaHTML.textContent = "Las cookies están DESHABILITADAS en este navegador.";
    etiquetaHTML.style.color = "red";
}
*/

/*Ejercicio 2
//1
console.log(location.href); 
//2
console.log(location.protocol); 
console.log(location.hostname); 
console.log(location.port);     
console.log(location.pathname);
//3        3 y 4 se ponen directamente en la consola, si no se ejecutan todo el rato
//location.reload();
//4
//location.href = "https://github.com";
*/

//1 y 2
function prep() {
    console.log("Partida lista");
    
}

console.log("Preparando partida");
setTimeout(prep,3000);
//2
console.log("Puedes seguir jugando");

//3
function avisar() {
    console.log("Revisa tu inventario");
}
const aviso=setTimeout(avisar,5000);
//4
clearTimeout(aviso);
console.log("(El aviso de inventario ha sido cancelado y no se mostrará)");