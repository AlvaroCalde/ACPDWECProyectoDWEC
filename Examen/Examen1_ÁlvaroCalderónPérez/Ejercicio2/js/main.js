
/*
----------------------------------------------
    EJERCICIO 2. RESERVA DE ASIENTOS DE CINE
----------------------------------------------
*/

const SEATS = [
    [null, null, "Ana", null, null],
    [null, "Luis", null, null, null],
    ["Marta", null, null, "Carlos", null],
    [null, null, null, null, "Lucía"],
    [null, "Javier", null, null, null]
];

function showMenu() {
    return prompt(`
        Selecciona una opción:
        1. Mostrar asientos
        2. Mostrar reservas
        3. Mostrar asientos libres
        4. Reservar asiento
        5. Liberar asiento
        6. Salir
    `);
}

function showSeats() {
    for (let i = 0; i < SEATS.length; i++) {
        let rowstring = `Fila ${i}: `;
        for (let j = 0; j < SEATS[i].length; j++) {
            if (SEATS[i][j] === null) {
                rowstring += `[ ] `;
            } else {
                rowstring += SEATS[i][j];
            }
        }
        console.log(rowstring);
    }
}

function showReservations() {
    console.log("--- RESERVAS ACTUALES ---");
    for (let i = 0; i < SEATS.length; i++) {
        for (let j = 0; j < SEATS[i].length; j++) {
            if (SEATS[i][j] !== null) {
                console.log(`Butaca ${i + 1},${j + 1}: ${SEATS[i][j]}`);
            }
        }
    }

}

function showFreeSeats() {
    console.log("--- ASIENTOS LIBRES ---");
    for (let i = 0; i < SEATS.length; i++) {
        let filaLibre = "";
        for (let j = 0; j < SEATS[i].length; j++) {
            if (SEATS[i][j] === null) {
                filaLibre += `Butaca ${i + 1},${j + 1} | `;
            }
        }
        if (filaLibre !== "") {
            console.log(filaLibre);
        }
    }



}

function reserveSeat() {
    /*
    4. IMPLEMENTA LA FUNCIÓN PARA RESERVAR UN ASIENTO DEL CINE
    Cuando se haga la reserva muestra por consola el mensaje
    "Reserva realizada el día dd/mm/aaaa a las hh:mm:ss"
    Usa la fecha actual para mostrarla en el mensaje
    Usa Date.now()
    */
    let row = parseInt(prompt("Introduce el número de fila (1-5):")) - 1;
    let col = parseInt(prompt("Introduce el número de butaca (1-5):")) - 1;
    let name = prompt("Introduce el nombre para la reserva:");
    
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        if (SEATS[row][col] === null) {
            SEATS[row][col] = name;
            
            let date = new Date(Date.now());
            let dateStr = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
            let timeStr = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            console.log(`Reserva realizada el día ${dateStr} a las ${timeStr}`);
        } else {
            alert("Ese asiento ya está reservado.");
        }
    } else {
        alert("Fila o columna no válida.");
    }
}

function freeSeat() {
    let row = parseInt(prompt("Introduce el número de fila a liberar(1-5):")) - 1;
    let col = parseInt(prompt("Introduce el número de butaca a liberar(1-5):")) - 1;

    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
        if (SEATS[row][col] !== null) {
            alert(`Asiento liberado correctamente. Pertenecía a ${SEATS[row][col]}.`);
            SEATS[row][col] = null;
        } else {
            alert("El asiento ya estaba libre.");
        }
    } else {
        alert("Fila o columna no válida.");
    }
}


let continueLoop = true;
while (continueLoop) {
    let option = showMenu();
    switch (option) {
        case "1":
            showSeats();
            break;
        case "2":
            showReservations();
            break;
        case "3":
            showFreeSeats();
            break;
        case "4":
            reserveSeat();
            break;
        case "5":
            freeSeat();
            break;
        case "6":
            continueLoop = false;
            break;
        default:
            alert("Opción no válida");
    }
}