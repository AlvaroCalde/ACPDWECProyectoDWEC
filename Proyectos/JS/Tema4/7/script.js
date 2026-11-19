// 1. Leer los controles y el párrafo de resumen
const nombreTexto = document.getElementById('nombre').value.trim();
const precioTexto = document.getElementById('precio').value.trim();
const cantidadTexto = document.getElementById('cantidad').value.trim();
const resumenEl = document.getElementById('resumen');

// 2. Convertir precio y cantidad a número
const precio = Number(precioTexto);
const cantidad = Number(cantidadTexto);

// 3. Validar los datos
if (nombreTexto === '' || precioTexto === '' || cantidadTexto === '') {
    resumenEl.textContent = 'Error: Todos los campos son obligatorios.';
} else if (Number.isNaN(precio) || precio < 0) {
    resumenEl.textContent = 'Error: El precio debe ser un número mayor o igual que 0.';
} else if (!Number.isInteger(cantidad) || cantidad <= 0) {
    resumenEl.textContent = 'Error: La cantidad debe ser un número entero positivo.';
} else {
    // 4. Calcular total y mostrar resumen con textContent
    const total = precio * cantidad;
    // toFixed(2) devuelve el número con 2 decimales. Devuelve un string así que se debería usar cuando se muestra y no antes de hacer las operaciones
    resumenEl.textContent = `Pedido: ${cantidad} x ${nombreTexto} (${precio.toFixed(2)} €) — Total: ${total.toFixed(2)} €`;
}