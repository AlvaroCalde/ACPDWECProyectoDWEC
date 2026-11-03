console.log("EJERCICIO SIN FETCH")
console.log("\nSEGUNDO EJERCICIO\n");
// 1. 
const preferenciasJSON = `{
  "usuario": "Alex",
  "sonido": true,
  "volumen": 70,
  "idiomas": ["es", "en"],
  "favoritos": [
    "Bosque",
    "Desierto"
  ]
}`;

const preferencias = JSON.parse(preferenciasJSON);

// 2. 
console.log("Primer idioma:", preferencias.idiomas[0]);

console.log("Lugares favoritos:");
preferencias.favoritos.forEach(lugar => {
    console.log("- " + lugar);
});

// 3. 
preferencias.favoritos.push("Montaña");
preferencias.volumen = 40;
preferencias.sonido = false;

// 4. 
const nuevoJSON = JSON.stringify(preferencias,null,2);
console.log("\nNuevo JSON generado:");
console.log(nuevoJSON);

// Comprobación de tipos al recuperarlo
const preferenciasRecuperadas = JSON.parse(nuevoJSON);

console.log("\nComprobación de tipos:");
console.log("¿'favoritos' es un Array?:", Array.isArray(preferenciasRecuperadas.favoritos));
console.log("¿'sonido' es un booleano?:", typeof preferenciasRecuperadas.sonido === 'boolean');

console.log("//////////////////////////////////////////////////////////////");

console.log("EJERCICIO CON FETCH")
fetch("./Data/preferencias.json")
  // 1. Convierte la respuesta a un objeto de JS
  .then(response => response.json())

  // 2. Bloque para validar los datos
  .then(data => {
    if (!data || !Array.isArray(data.idiomas) || !Array.isArray(data.favoritos)) {
      throw new Error("Validación fallida: 'idiomas' o 'favoritos' no son arrays.");
    }
    return data;
  })

  // 3. Bloque para asignar y usar los datos
  .then(preferencias => {
    console.log("Primer idioma:", preferencias.idiomas[0]);
    
    console.log("Lugares favoritos:");
    preferencias.favoritos.forEach(lugar => console.log("- " + lugar));
    
    preferencias.favoritos.push("Montaña");
    preferencias.volumen = 40;
    preferencias.sonido = false;
    
    const nuevoJSON = JSON.stringify(preferencias, null, 2);
    console.log("\nNuevo JSON generado:\n", nuevoJSON);
    
    // Comprobación de tipos simulando recuperación
    const preferenciasRecuperadas = JSON.parse(nuevoJSON);
    console.log("¿'favoritos' es Array?:", Array.isArray(preferenciasRecuperadas.favoritos));
    console.log("¿'sonido' es booleano?:", typeof preferenciasRecuperadas.sonido === 'boolean');
  })

  // Captura de errores
  .catch(error => console.error('Error en el proceso JSON 2:', error.message));