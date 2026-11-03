console.log("EJERCICIO SIN FETCH")
// 1. Crea tienda.json (simulado) y parsea sus datos.
const tiendaJSON = `{
  "tienda": "Aldea",
  "productos": [
    { "id": 1, "nombre": "Poción", "precio": 10, "stock": 5 },
    { "id": 2, "nombre": "Escudo", "precio": 40, "stock": 2 },
    { "id": 3, "nombre": "Arco", "precio": 30, "stock": 0 }
  ]
}`;

const tienda = JSON.parse(tiendaJSON);

// Recorre productos y muestra solo los que tienen stock mayor que 0
console.log("Productos con stock disponible:");
tienda.productos.forEach(producto => {
    if (producto.stock > 0) {
        console.log(`- ${producto.nombre} (Stock: ${producto.stock})`);
    }
});

// 2. Calcula el valor de las existencias (precio × stock)
function calcularValorTotal(productos) {
    return productos.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
}
let valorTotal = calcularValorTotal(tienda.productos);
console.log("\nValor total inicial de las existencias:", valorTotal);

// 3. Busca el producto con id 2. Simula venta si hay stock y recalcula.
const productoId2 = tienda.productos.find(p => p.id === 2);

if (productoId2 && productoId2.stock > 0) {
    console.log(`\nVendiendo una unidad de: ${productoId2.nombre}...`);
    productoId2.stock -= 1; // Resta una unidad
    
    // Vuelve a calcular el valor total
    valorTotal = calcularValorTotal(tienda.productos);
    console.log("Nuevo valor total tras la venta:", valorTotal);
}

// 4. Guarda el catálogo en localStorage y recupéralo
localStorage.setItem("practica_tienda", JSON.stringify(tienda));
console.log("\nCatálogo guardado en localStorage.");

const datosGuardados = localStorage.getItem("practica_tienda");
if (datosGuardados) {
    const tiendaRecuperada = JSON.parse(datosGuardados);
    const productoRecuperado = tiendaRecuperada.productos.find(p => p.id === 2);
    console.log("Comprobación de stock recuperado para Escudo (debe ser 1):", productoRecuperado.stock === 1, `(${productoRecuperado.stock})`);
}


console.log("//////////////////////////////////////////////////////////////");

console.log("EJERCICIO CON FETCH")
fetch("./Data/tienda.json")
  // 1. Convierte la respuesta a un objeto de JS
  .then(response => response.json())

  // 2. Bloque OPCIONAL para validar los datos
  .then(data => {
    if (!data || !Array.isArray(data.productos)) {
      throw new Error("Validación fallida: No se encontró la lista de productos.");
    }
    return data;
  })

  // 3. Bloque para asignar y usar los datos
  .then(tienda => {
    // 1. Muestra solo los que tienen stock mayor que 0
    console.log("Productos con stock disponible:");
    tienda.productos.forEach(producto => {
        if (producto.stock > 0) {
            console.log(`- ${producto.nombre} (Stock: ${producto.stock})`);
        }
    });

    // 2. Calcula el valor de las existencias
    const calcularTotal = (prods) => prods.reduce((acc, p) => acc + (p.precio * p.stock), 0);
    let valorTotal = calcularTotal(tienda.productos);
    console.log("\nValor total inicial de las existencias:", valorTotal);

    // 3. Busca el producto con id 2 y simula venta
    const productoId2 = tienda.productos.find(p => p.id === 2);
    if (productoId2 && productoId2.stock > 0) {
        console.log(`\nVendiendo una unidad de: ${productoId2.nombre}...`);
        productoId2.stock -= 1;
        valorTotal = calcularTotal(tienda.productos);
        console.log("Nuevo valor total tras la venta:", valorTotal);
    }

    // 4. Guarda y recupera de localStorage
    localStorage.setItem("practica_tienda", JSON.stringify(tienda));
    console.log("\nCatálogo guardado en localStorage.");
    
    const recuperadoStr = localStorage.getItem("practica_tienda");
    if (recuperadoStr) {
        const tiendaRecuperada = JSON.parse(recuperadoStr);
        const productoRecuperado = tiendaRecuperada.productos.find(p => p.id === 2);
        console.log("Comprobación de stock recuperado para Escudo (debe ser 1):", productoRecuperado.stock === 1);
    }
  })

  // Captura de errores
  .catch(error => console.error('Error en el proceso JSON 4:', error.message));