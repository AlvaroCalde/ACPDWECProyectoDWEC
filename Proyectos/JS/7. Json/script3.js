console.log("EJERCICIO SIN FETCH")
// 1. Simulación del archivo personaje.json y conversión con JSON.parse()
const personajeJSON = `{
  "nombre": "Alex",
  "estadisticas": {
    "nivel": 4,
    "vida": 80
  },
  "posicion": {
    "zona": "Bosque",
    "x": 10,
    "y": 5
  },
  "inventario": ["arco", "poción"]
}`;

const personaje = JSON.parse(personajeJSON);

// Muestra la vida y la zona usando sus rutas completas
console.log("Vida inicial:", personaje.estadisticas.vida);
console.log("Zona inicial:", personaje.posicion.zona);

// 2. Resta 20 a la vida, suma 5 a la coordenada x y añade "escudo" al inventario
personaje.estadisticas.vida -= 20;
personaje.posicion.x += 5;
personaje.inventario.push("escudo");

// 3. Guarda el personaje modificado en localStorage con la clave "practica_personaje" y JSON.stringify()
localStorage.setItem("practica_personaje", JSON.stringify(personaje));
console.log("\nPersonaje modificado y guardado en localStorage.");

// 4. Simula la recarga y recupera los datos. Comprueba que la clave no es null.
const datosGuardados = localStorage.getItem("practica_personaje");

if (datosGuardados !== null) {
    const personajeRecuperado = JSON.parse(datosGuardados);
    
    console.log("\n--- Verificación de los tres cambios ---");
    console.log("1. ¿Vida es 60?:", personajeRecuperado.estadisticas.vida === 60, `(${personajeRecuperado.estadisticas.vida})`);
    console.log("2. ¿Coordenada X es 15?:", personajeRecuperado.posicion.x === 15, `(${personajeRecuperado.posicion.x})`);
    console.log("3. ¿Tiene 'escudo'?:", personajeRecuperado.inventario.includes("escudo"), `(${personajeRecuperado.inventario})`);
} else {
    console.log("Error: No se encontraron datos en localStorage para 'practica_personaje'.");
}

console.log("//////////////////////////////////////////////////////////////");

console.log("EJERCICIO CON FETCH")
fetch("./Data/personaje.json")
  // 1. Convierte la respuesta a un objeto de JS
  .then(response => response.json())

  // 2. Bloque para validar los datos
  .then(data => {
    if (!data || !data.estadisticas || typeof data.estadisticas.vida !== 'number') {
      throw new Error("Validación fallida: Faltan estadísticas o la vida no es un número.");
    }
    return data;
  })

  // 3. Bloque para asignar y usar los datos
  .then(personaje => {
    console.log("Vida inicial:", personaje.estadisticas.vida);
    console.log("Zona inicial:", personaje.posicion.zona);
    
    personaje.estadisticas.vida -= 20;
    personaje.posicion.x += 5;
    personaje.inventario.push("escudo");
    
    localStorage.setItem("practica_personaje", JSON.stringify(personaje));
    console.log("\nPersonaje guardado en localStorage.");
    
    // 4. Recuperación
    const datosGuardados = localStorage.getItem("practica_personaje");
    if (datosGuardados !== null) {
      const personajeRecuperado = JSON.parse(datosGuardados);
      console.log("\n--- Verificación ---");
      console.log("¿Vida es 60?:", personajeRecuperado.estadisticas.vida === 60);
      console.log("¿Coordenada X es 15?:", personajeRecuperado.posicion.x === 15);
      console.log("¿Tiene 'escudo'?:", personajeRecuperado.inventario.includes("escudo"));
    }
  })

  // Captura de errores
  .catch(error => console.error('Error en el proceso JSON 3:', error.message));