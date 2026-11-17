// 1. Seleccionar título, autor y resumen con getElementById()
const titulo = document.getElementById('titulo');
const autor = document.getElementById('autor');
const resumen = document.getElementById('resumen');

// 2. Mostrar en consola cada elemento, su tagName y su textContent
console.log("--- Elementos encontrados ---");

console.log("Elemento Título:", titulo);
console.log("Etiqueta:", titulo.tagName);
console.log("Texto:", titulo.textContent);
console.log("-------------------");

console.log("Elemento Autor:", autor);
console.log("Etiqueta:", autor.tagName);
console.log("Texto:", autor.textContent);
console.log("-------------------");

console.log("Elemento Resumen:", resumen);
console.log("Etiqueta:", resumen.tagName);
console.log("Texto:", resumen.textContent);
console.log("-------------------");

// 3. Buscar el id «fecha» (que no existe)
const fecha = document.getElementById('fecha');

// 4. Controlar el resultado antes de consultar sus propiedades
if (fecha) {
    // Si existiera, mostraríamos sus datos
    console.log(fecha, fecha.tagName, fecha.textContent);
} else {
    // Como es null, mostramos el mensaje de control
    console.log("Atención: El elemento con el id 'fecha' no se ha encontrado (es null).");
}