// 1. Obtener todos los enlaces dentro del contenedor #recursos
const enlacesNodeList = document.querySelectorAll('#recursos a');

// 2. Construir un array con sus textos y eliminar espacios sobrantes con trim()
// Usamos Array.from() para convertir la NodeList a Array y poder usar map()
// map recorre un array, aplica una operación a cada elemento y devuelve un array nuevo con el mismo length
const textosEnlaces = Array.from(enlacesNodeList).map(enlace => {
    return enlace.textContent.trim();
});

// 3. Filtrar los textos que contengan «guía» sin distinguir mayúsculas ni minúsculas
const textosFiltrados = textosEnlaces.filter(texto => {
    // se pasa el texto a minúsculas para que "Guía" y "guía" coincidan
    return texto.toLowerCase().includes('guía');
});

// 4. Mostrar resultados en consola
console.log("--- Array Completo ---");
console.log(textosEnlaces);
console.log(`Total de enlaces: ${textosEnlaces.length}`); // Comprobación: 4

console.log("\n--- Array Filtrado (contiene 'guía') ---");
console.log(textosFiltrados);
console.log(`Enlaces filtrados: ${textosFiltrados.length}`); // Comprobación: 2