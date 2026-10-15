import {Book} from './book.js';
import {library} from './library.js';

/*
----------------------------------------------
    EJERCICIO 1. BIBLIOTECA DE LIBROS
----------------------------------------------
*/



function showMenu() {
    return prompt(`
        Selecciona una opción:
        1. Mostrar todos los libros
        2. Mostrar libros por género
        3. Mostrar precio medio
        4. Mostrar libro más leído
        5. Mostrar libros terminados
        6. Salir
    `);
}


function showBooks(){
   console.table(library, ['title', 'genre', 'price', 'hoursReaded', 'finished']); 
}

function showBooksByGenre() {
    //Genres es un array que contiene todos los géneros de los libros de la biblioteca sin repetir
    let genres = [...new Set(library.map(book => book.genre))];

    let option = prompt(`
        Selecciona un género:
        1. Ficción
        2. Distópico
        3. Romance
        4. Fantasía
        5. Thriller
        6. Misterio
        7. Clásico
        8. Poesía
        9. Aventura
        10. Épico
        11. Modernista
        12. Drama
        13. Realismo mágico
        14. Ensayo
        15. Suspense
        16. Terror
        17. Histórico
    `);

    genres = [...new Set(library.map(book => book.genre))];
        // pido el género
        let menuText = "Selecciona un género:\n";
        genres.forEach((genre, index) => {
            menuText += `${index + 1}. ${genre}\n`;
        });
        
        let selectedIndex = parseInt(option) - 1;
        
        //si la opción introducidad es mayor/igual a 0 y está dentro del array lo muestro como una tabla
        if (selectedIndex >= 0 && selectedIndex < genres.length) {
            let selectedGenre = genres[selectedIndex];
            let filteredBooks = library.filter(book => book.genre === selectedGenre);
            console.table(filteredBooks, ['title', 'genre', 'price', 'hoursReaded', 'finished']);
        } else {
            alert('Género no válido');
        }
}

function showAveragePrice() {
    let total = library.reduce((sum, book) => sum + book.price, 0);
        let average = (total / library.length);
        console.log(`El precio medio de los libros es: ${average}`);
        alert(`El precio medio de los libros es: ${average}`);
}

function showMostReadBook() {
   if (library.length === 0) return;  
       let mostRead = library.reduce((prev, current) => {
           return (prev.hoursReaded > current.hoursReaded) ? prev : current;
       });     
       console.log(`El libro más leído es "${mostRead.title}" con ${mostRead.hoursReaded} horas.`);
       alert(`El libro más leído es "${mostRead.title}" con ${mostRead.hoursReaded} horas.`);
}

function showFinishedBooks() {
    // con .filter filtro los resultados dependiendo del valor de su atributo finished
    let finishedBooks = library.filter(book => book.finished === true);
    console.log("Libros terminados:");
    console.table(finishedBooks, ['title', 'genre', 'price', 'hoursReaded', 'finished']);

}

let continueLoop = true;
while (continueLoop) {
    let option = showMenu();

    switch (option) {
        case '1':
            showBooks();
            break;
        case '2':
            showBooksByGenre();
            break;
        case '3':
            showAveragePrice();
            break;
        case '4':
            showMostReadBook();
            break;
        case '5':
            showFinishedBooks();
            break;
        case '6':
            continueLoop = false;
            break;
        default:
            alert('Opción no válida');
    }
}