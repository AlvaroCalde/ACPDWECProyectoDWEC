console.log("EJERCICIO SIN FETCH")
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

console.log("//////////////////////////////////////////////////////////////");

console.log("EJERCICIO CON FETCH")
fetch("./Data/perfil.json")
  // 1. Convierte la respuesta a un objeto de JS
  .then(response => response.json())

  // 2. Bloque para validar los datos
  .then(data => {
    if (!data || typeof data.nivel !== 'number' || typeof data.activo !== 'boolean') {
      throw new Error("Validación fallida: Faltan datos o los tipos son incorrectos.");
    }
    return data;
  })

  // 3. Bloque para asignar y usar los datos
  .then(perfil => {
    console.log("Nombre:", perfil.nombre);
    console.log("Nivel:", perfil.nivel);
    
    console.log("Tipo de 'nivel':", typeof perfil.nivel);
    console.log("Tipo de 'activo':", typeof perfil.activo);
    
    perfil.nivel += 1;
    
    const nuevoPerfilJSON = JSON.stringify(perfil, null, 2);
    console.log("Nuevo JSON:\n", nuevoPerfilJSON);
  })

  // Captura de errores
  .catch(error => console.error('Error en el proceso JSON 1:', error.message));