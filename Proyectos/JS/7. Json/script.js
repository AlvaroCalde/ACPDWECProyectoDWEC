// 1. 
// 2. 
console.log("PRIMER EJERCICIO\n");
const perfilJSON = `{
  "nombre": "Alex",
  "nivel": 3,
  "activo": true
}`;

const perfil = JSON.parse(perfilJSON);
console.log("Nombre:", perfil.nombre);
console.log("Nivel:", perfil.nivel);

// 3. 
console.log("\nTipo de 'nivel':", typeof perfil.nivel);
console.log("Tipo de 'activo':", typeof perfil.activo);


console.log("Nivel aumentado:", perfil.nivel+1);

// 4. 
const nuevoPerfilJSON = JSON.stringify(perfil,null,2);//lo hago así para que salga formateado y no todo en una linea

console.log("\n--- Comparación ---");
console.log("JSON inicial:\n", perfilJSON);
console.log("Nuevo JSON:\n", nuevoPerfilJSON);
//////////////////////////////////////////////////////////////////////////////////////////////////////
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