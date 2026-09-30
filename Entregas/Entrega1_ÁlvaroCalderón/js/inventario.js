class Item{
    constructor(name,description,quantity,maxStack){
        this.name=name;
        this.description=description;
        this._quantity=quantity;
        this.maxStack=maxStack
    }
    set quantity(value){
        //se llama _quantity porque el nombre per se está repetido y se debe diferenciar
        this._quantity=(value<this.maxStack) ? value : 64
    }
    get quantity() {
        return this._quantity;
    }
    showInfo() {
        // Devuelve los elementos formateados (Piedra (10/64) - Bloque de piedra)
        return `${this.name} (${this.quantity}/${this.maxStack}) - ${this.description}`;
    }
}

// Creación de la matriz con todos los huecos null

const rows = 4;
const columns = 9;
const inventory = [];

for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < columns; j++) {
        //añade las columnas que debe tener una fila
        row.push(null);
    }
    //añade cada fila al final de la matriz
    inventory.push(row);
}

// Meto algunos items de prueba 
inventory[0][0] = new Item("Piedra", "Bloque de piedra común", 64, 64);
inventory[0][1] = new Item("Manzana", "Restaura hambre", 10, 64);
inventory[0][2] = new Item("Antorcha", "Ilumina tu camino", 32, 64);
inventory[1][0] = new Item("Espada de diamante", "Arma muy duradera", 1, 1);
inventory[1][1] = new Item("Pico de hierro", "Herramienta para minar", 1, 1);
// Extra para probar que la suma de stacks funciona
inventory[1][2] = new Item("Piedra", "Bloque de piedra común", 20, 64); 




// Mostrar el inventario
const showInventory = () => {
    console.log("--- INVENTARIO COMPLETO ---");
    for (let i = 0; i < rows; i++) {
        let rowstring = `Fila ${i}: `;
        for (let j = 0; j < columns; j++) {
            if (inventory[i][j] === null) {
                rowstring += `[ // ]`;
            } else {
                rowstring += ` ${inventory[i][j].name}(${inventory[i][j].quantity})`;
            }
        }
        console.log(rowstring);
    }
};

// Mostrar barra de accesos rápidos (Primera fila)
const showQuickAccessBar = () => {
    console.log("--- BARRA DE ACCESOS RÁPIDOS ---");
    let quickBar = "";
    inventory[0].forEach((item, index) => {
        if (item === null) {
            quickBar += ` ${index}: [ // ]  `;
        } else {
            quickBar += ` ${index}: [ ${item.name} (${item.quantity}) ]  `;
        }
    });
    console.log(quickBar);
};

// Buscar un objeto
const searchItem = () => {
    const itemName = prompt("Introduce el nombre del objeto a buscar:")?.trim().toLowerCase();
    if (!itemName) return;
    
    let found = false;
    console.log(`--- RESULTADOS DE BÚSQUEDA: ${itemName.toUpperCase()} ---`);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const item = inventory[i][j];
            if (item !== null && item.name.toLowerCase() === itemName) {
                console.log(`Fila: ${i}, Columna: ${j} -> ${item.showInfo()}`);
                found = true;
            }
        }
    }
    if (!found) {
        console.log("El objeto no se encuentra en el inventario.");
    }
};

// Añadir un objeto
const addItem = () => {
    const name = prompt("Nombre del objeto:");
    const description = prompt("Descripción del objeto:");
    let quantity = parseInt(prompt("Cantidad a añadir:"));
    const maxStack = parseInt(prompt("Stack máximo del objeto:"));

    if (!name || isNaN(quantity) || quantity <= 0 || isNaN(maxStack) || maxStack <= 0) {
        alert("Datos inválidos. Operación cancelada.");
        return;
    }

    // 1. Intentar llenar stacks existentes que no estén completos
    for (let i = 0; i < rows && quantity > 0; i++) {
        for (let j = 0; j < columns && quantity > 0; j++) {
            const item = inventory[i][j];
            if (item !== null && item.name.toLowerCase() === name.toLowerCase() && item.quantity < item.maxStack) {
                const spaceLeft = item.maxStack - item.quantity;
                if (quantity <= spaceLeft) {
                    item.quantity += quantity;
                    quantity = 0;
                    console.log(`Unidades añadidas al stack en ${i},${j}.`);
                } else {
                    item.quantity = item.maxStack;
                    quantity -= spaceLeft;
                    console.log(`Stack en ${i},${j} llenado. Faltan por colocar ${quantity} unidades.`);
                }
            }
        }
    }

    // 2. Si todavía queda cantidad, crear nuevos objetos en huecos libres (respetando maxStack)
    while (quantity > 0) {
        let placed = false;
        for (let i = 0; i < rows && !placed; i++) {
            for (let j = 0; j < columns && !placed; j++) {
                if (inventory[i][j] === null) {
                    const qtyToPlace = Math.min(quantity, maxStack);
                    inventory[i][j] = new Item(name, description, qtyToPlace, maxStack);
                    quantity -= qtyToPlace;
                    placed = true;
                    console.log(`Creado nuevo stack en ${i},${j} con cantidad ${qtyToPlace}.`);
                }
            }
        }
        if (!placed) {
            alert(`¡El inventario está lleno! Se perdieron ${quantity} unidades.`);
            break;
        }
    }
};

// Validación para saber si la casilla de origen/destino existe
const isValidPos = (r, c) => !isNaN(r) && !isNaN(c) && r >= 0 && r < rows && c >= 0 && c < columns;

// Mover un objeto
const moveItem = () => {
    const rOrig = parseInt(prompt("Fila origen (0-3):"));
    const cOrig = parseInt(prompt("Columna origen (0-8):"));
    
    if (!isValidPos(rOrig, cOrig) || inventory[rOrig][cOrig] === null) {
        alert("Origen no válido o el hueco está vacío.");
        return;
    }

    const rDest = parseInt(prompt("Fila destino (0-3):"));
    const cDest = parseInt(prompt("Columna destino (0-8):"));

    if (!isValidPos(rDest, cDest)) {
        alert("Destino no válido.");
        return;
    }

    const itemOrig = inventory[rOrig][cOrig];
    const itemDest = inventory[rDest][cDest];

    if (itemDest === null) {
        // Mover a un hueco vacío
        inventory[rDest][cDest] = itemOrig;
        inventory[rOrig][cOrig] = null;
        console.log(`Objeto movido exitosamente a ${rDest},${cDest}.`);
    } else if (itemOrig.name.toLowerCase() === itemDest.name.toLowerCase()) {
        // Combinar stacks
        const spaceLeft = itemDest.maxStack - itemDest.quantity;
        if (spaceLeft > 0) {
            if (itemOrig.quantity <= spaceLeft) {
                itemDest.quantity += itemOrig.quantity;
                inventory[rOrig][cOrig] = null;
                console.log("Stacks combinados completamente.");
            } else {
                itemDest.quantity = itemDest.maxStack;
                itemOrig.quantity -= spaceLeft;
                console.log("El stack de destino se llenó, pero sobraron unidades en el origen.");
            }
        } else {
            alert("El stack de destino ya está lleno.");
        }
    } else {
        alert("El hueco de destino está ocupado por un objeto distinto.");
    }
};

// Eliminar un objeto
const deleteItem = () => {
    const r = parseInt(prompt("Fila a vaciar (0-3):"));
    const c = parseInt(prompt("Columna a vaciar (0-8):"));

    if (isValidPos(r, c) && inventory[r][c] !== null) {
        const itemName = inventory[r][c].name;
        if (confirm(`¿Estás seguro de que deseas destruir el objeto '${itemName}' en la posición ${r},${c}?`)) {
            inventory[r][c] = null;
            console.log(`Objeto en ${r},${c} eliminado correctamente.`);
        } else {
            console.log("Eliminación cancelada.");
        }
    } else {
        alert("Posición no válida o hueco ya está vacío.");
    }
};

// Mostrar huecos libres
const countFreeSpaces = () => {
    let totalFree = 0;
    let quickBarFree = 0;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (inventory[i][j] === null) {
                totalFree++;
                if (i === 0) quickBarFree++;
            }
        }
    }
    console.log(`Huecos libres en todo el inventario: ${totalFree}`);
    console.log(`Huecos libres en la barra de acceso rápido: ${quickBarFree}`);
};

// Mostrar el objeto más abundante
const getMostQuantityStack = () => {
    const quantities = {};

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const item = inventory[i][j];
            if (item !== null) {
                if (quantities[item.name]) {
                    quantities[item.name] += item.quantity;
                } else {
                    quantities[item.name] = item.quantity;
                }
            }
        }
    }

    let maxName = null;
    let maxQty = 0;

    for (const [name, qty] of Object.entries(quantities)) {
        if (qty > maxQty) {
            maxQty = qty;
            maxName = name;
        }
    }

    if (maxName) {
        console.log(`El objeto más abundante es: ${maxName} con un total de ${maxQty} unidades.`);
    } else {
        console.log("El inventario está completamente vacío.");
    }
};

// Menú principal
const mainMenu = () => {
    let option;
    const menuText = `INVENTARIO DE MINECRAFT
======================================
1. Mostrar inventario completo
2. Mostrar barra de accesos rápidos
3. Buscar un objeto
4. Añadir un objeto al inventario
5. Mover un objeto
6. Eliminar un objeto
7. Mostrar huecos libres
8. Mostrar el objeto más abundante
0. Salir

Elige una opción:`;

    do {
        option = prompt(menuText);

        if (option >= '1' && option <= '8') {
            console.log(`\n--- Opción seleccionada: ${option} ---`); 
        }

        switch (option) {
            case '1': showInventory(); break;
            case '2': showQuickAccessBar(); break;
            case '3': searchItem(); break;
            case '4': addItem(); break;
            case '5': moveItem(); break;
            case '6': deleteItem(); break;
            case '7': countFreeSpaces(); break;
            case '8': getMostQuantityStack(); break;
            case '0': alert("Adiós"); break;
            default:
                alert("Opción no válida. Por favor ingresa un número del 0 al 8.");
        }
    } while (option !== '0');
};
mainMenu();

