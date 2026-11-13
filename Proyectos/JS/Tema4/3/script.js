// 1. Obtener todos los li de #tareas
const listaTareas = document.querySelectorAll('#tareas li');

// 2. Recorrer la colección y mostrar sus textos numerados desde 1
console.log("--- Lista de Tareas ---");
listaTareas.forEach((tarea, index) => {
    // textContent.trim() elimina espacios en blanco extra alrededor del texto
    console.log(`${index + 1}. ${tarea.textContent.trim()}`); 
});

// 3. Contar los elementos urgentes mediante otra consulta
const tareasUrgentes = document.querySelectorAll('#tareas li.urgente');
console.log("\n--- Comprobaciones ---");
console.log(`Total de tareas: ${listaTareas.length}`);
console.log(`Tareas urgentes: ${tareasUrgentes.length}`); 

// 4. Buscar los que tengan la clase 'finalizada' y recorrer el resultado
const tareasFinalizadas = document.querySelectorAll('#tareas li.finalizada');
console.log(`Tareas finalizadas: ${tareasFinalizadas.length}`); 

// El recorrido no produce errores aunque la NodeList esté vacía (longitud 0)
tareasFinalizadas.forEach(tarea => {
    console.log(`Finalizada: ${tarea.textContent}`);
});