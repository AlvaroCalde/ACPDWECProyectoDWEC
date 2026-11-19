// 1. Seleccionar los elementos del DOM
const nombreEl = document.querySelector('.nombre');
const descripcionEl = document.querySelector('.descripcion');
const precioEl = document.querySelector('.precio');
const listaCaracteristicas = document.querySelectorAll('.caracteristicas li');

// 2. Crear el objeto producto con los datos y el array de características del HTML
const producto = {
    nombre: 'Mochila',
    descripcion: 'Mochila de clase',
    precio: 24.5,
    caracteristicas: Array.from(listaCaracteristicas).map(li => li.textContent.trim())
};

// 3. Función para actualizar la ficha usando textContent
function actualizarFicha() {
    nombreEl.textContent = producto.nombre;
    descripcionEl.textContent = producto.descripcion;
    
    // toFixed(2) formatea el número para que siempre muestre dos decimales
    precioEl.textContent = `${producto.precio.toFixed(2)} €`;

    // Usamos el texto guardado en el array, no el que tiene el <li> en ese momento
    listaCaracteristicas.forEach((li, index) => {
        li.textContent = `${index + 1}. ${producto.caracteristicas[index]}`;
    });
}

// 4. Ejecutar dos veces la función de actualización
actualizarFicha();
actualizarFicha();