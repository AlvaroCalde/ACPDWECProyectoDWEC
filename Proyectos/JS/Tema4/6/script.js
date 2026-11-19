const cadena = '<strong>Oferta</strong>';

// 1. Asignar la cadena con textContent e innerHTML
const salidaTexto = document.getElementById('salida-texto');
const salidaHtml = document.getElementById('salida-html');

salidaTexto.textContent = cadena;
salidaHtml.innerHTML = cadena;

// 2. Comparar sus hijos (elementos HTML internos)
console.log('--- Comparación de hijos ---');
console.log('Hijos de #salida-texto:', salidaTexto.children.length, salidaTexto.children); // 0
console.log('Hijos de #salida-html:', salidaHtml.children.length, salidaHtml.children);    // 1 (<strong>)

// 3. Guardar referencia al enlace de #mensaje
const mensaje = document.getElementById('mensaje');
const enlace = mensaje.querySelector('a');

// 4. Sustituir el contenido del párrafo con textContent
mensaje.textContent = 'Consulta la ayuda.';

// 5. Comprobar qué ocurre con el enlace
console.log('\n--- Comprobación del enlace ---');
console.log('Variable enlace:', enlace);                       // Sigue siendo <a href="/ayuda">ayuda</a>
console.log('Texto del enlace:', enlace.textContent);          // "ayuda"
console.log('¿Sigue conectado al DOM?:', enlace.isConnected);  // false
console.log('¿Existe un <a> en #mensaje?:', mensaje.querySelector('a')); // null