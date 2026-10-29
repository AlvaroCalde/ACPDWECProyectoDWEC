console.log("EJERCICIO SIN FETCH")
// 1. Crea partida.json (simulado) y parsea sus datos
const partidaJSON = `{
  "nombre": "Mundo 1",
  "config": {
    "dificultad": "normal", "sonido": true
  },
  "jugadores": [
    {
      "id": 1, "nombre": "Alex",
      "stats": {"vida": 80, "nivel": 4},
      "inventario": [
        {"nombre": "poción", "cantidad": 2}
      ]
    },
    {
      "id": 2, "nombre": "Steve",
      "stats": {"vida": 60, "nivel": 3},
      "inventario": []
    }
  ]
}`;

const partida = JSON.parse(partidaJSON);

// Recorre jugadores y muestra el nombre, el nivel y la vida de cada uno[cite: 7]
console.log("--- Estado inicial de los jugadores ---");
partida.jugadores.forEach(jugador => {
    console.log(`Nombre: ${jugador.nombre}, Nivel: ${jugador.stats.nivel}, Vida: ${jugador.stats.vida}`);
});

// 2. Busca al jugador con id 1. Si tiene pociones y vida menor de 100, consume una y suma 20 de vida (máx 100)[cite: 7].
const jugador1 = partida.jugadores.find(j => j.id === 1);
if (jugador1 && jugador1.stats.vida < 100) {
    const pocion = jugador1.inventario.find(item => item.nombre === "poción" && item.cantidad > 0);
    if (pocion) {
        pocion.cantidad -= 1;
        jugador1.stats.vida = Math.min(100, jugador1.stats.vida + 20);
        console.log(`\nAlex ha consumido una poción. Nueva vida: ${jugador1.stats.vida}, Pociones restantes: ${pocion.cantidad}`);
    }
}

// 3. Añade a Steve un objeto "escudo" con cantidad 1[cite: 7]. 
const steve = partida.jugadores.find(j => j.nombre === "Steve");
if (steve) {
    steve.inventario.push({"nombre": "escudo", "cantidad": 1});
}

// Calcula la cantidad total de objetos que lleva cada jugador[cite: 7].
console.log("\n--- Cantidad total de objetos por jugador ---");
partida.jugadores.forEach(jugador => {
    const totalObjetos = jugador.inventario.reduce((total, item) => total + item.cantidad, 0);
    console.log(`${jugador.nombre} lleva ${totalObjetos} objeto(s).`);
});

// 4. Guarda toda la partida en "practica_partida" de localStorage[cite: 7].
localStorage.setItem("practica_partida", JSON.stringify(partida));
console.log("\nPartida guardada en localStorage.");

// Recarga, recupera y verifica vidas, cantidades y configuración[cite: 7].
const partidaGuardada = localStorage.getItem("practica_partida");
if (partidaGuardada) {
    const partidaRecuperada = JSON.parse(partidaGuardada);
    console.log("\n--- Verificación de la partida recuperada ---");
    console.log("Configuración de sonido conservada:", partidaRecuperada.config.sonido === true);
    console.log("Vida de Alex (debe ser 100):", partidaRecuperada.jugadores[0].stats.vida === 100);
    console.log("Pociones de Alex (debe ser 1):", partidaRecuperada.jugadores[0].inventario[0].cantidad === 1);
    console.log("Steve tiene escudo:", partidaRecuperada.jugadores[1].inventario[0]?.nombre === "escudo");
}

console.log("//////////////////////////////////////////////////////////////");

console.log("EJERCICIO CON FETCH")
fetch("./Data/partida.json")
  // 1. Convierte la respuesta a un objeto de JS
  .then(response => response.json())

  // 2. Bloque OPCIONAL para validar los datos
  .then(data => {
    if (!data || !Array.isArray(data.jugadores) || !data.config) {
      throw new Error("Validación fallida: El archivo no tiene el formato esperado.");
    }
    return data;
  })

  // 3. Bloque para asignar y procesar la lógica de la partida
  .then(partida => {
    // 1. Mostrar estado de los jugadores[cite: 7]
    console.log("--- Estado inicial de los jugadores ---");
    partida.jugadores.forEach(jugador => {
        console.log(`Nombre: ${jugador.nombre}, Nivel: ${jugador.stats.nivel}, Vida: ${jugador.stats.vida}`);
    });

    // 2. Jugador 1 consume poción si su vida es menor de 100[cite: 7]
    const jugador1 = partida.jugadores.find(j => j.id === 1);
    if (jugador1 && jugador1.stats.vida < 100) {
        const pocion = jugador1.inventario.find(item => item.nombre === "poción" && item.cantidad > 0);
        if (pocion) {
            pocion.cantidad -= 1;
            jugador1.stats.vida = Math.min(100, jugador1.stats.vida + 20);
            console.log(`\nAlex consumió poción. Vida: ${jugador1.stats.vida}, Restantes: ${pocion.cantidad}`);
        }
    }

    // 3. Dar escudo a Steve y calcular objetos totales[cite: 7]
    const steve = partida.jugadores.find(j => j.nombre === "Steve");
    if (steve) {
        steve.inventario.push({"nombre": "escudo", "cantidad": 1});
    }

    console.log("\n--- Cantidad total de objetos por jugador ---");
    partida.jugadores.forEach(jugador => {
        const total = jugador.inventario.reduce((acc, item) => acc + item.cantidad, 0);
        console.log(`${jugador.nombre} lleva ${total} objeto(s).`);
    });

    // 4. Guardar, recuperar y verificar[cite: 7]
    localStorage.setItem("practica_partida", JSON.stringify(partida));
    
    const recuperadaStr = localStorage.getItem("practica_partida");
    if (recuperadaStr) {
        const recuperada = JSON.parse(recuperadaStr);
        console.log("\n--- Verificación de datos recuperados ---");
        console.log("Configuración sonido (true):", recuperada.config.sonido);
        console.log("Vida Alex (100):", recuperada.jugadores[0].stats.vida === 100);
        console.log("Pociones Alex (1):", recuperada.jugadores[0].inventario[0].cantidad === 1);
        console.log("Steve tiene escudo:", recuperada.jugadores[1].inventario[0]?.nombre === "escudo");
    }
  })

  // Captura de errores de red o validación
  .catch(error => console.error('Error procesando la partida:', error.message));