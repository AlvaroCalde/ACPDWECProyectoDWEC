# Documentación: Inventario de Minecraft en JavaScript

Este documento explica la función de cada método y bloque de código desarrollado para la simulación del inventario de Minecraft.

## 1. Versiones
* Versión 1.0: Fue la primera versión funcional y tenía errores de los que no era consciente.  
* Versión 1.1: Después de la entrega supe cuáles eran esos errores como que permitía crear 2 elementos iguales pero uno con mayúsculas y otro sin. En esta versión estos errores están corregidos y he optimizado un poco el código creando una función llamada **`findItemPositions(itemName)`** que hace que distintos metodos estén mejor optimizados

## 2. La Clase `Item`
Esta clase es el molde para crear cualquier objeto dentro del juego.

*   **`constructor(name, description, quantity, maxStack)`**: Se ejecuta al crear un nuevo objeto (ej. `new Item(...)`). Inicializa las propiedades básicas. Para la cantidad, en lugar de guardarla directamente, llama al *setter* (`this.quantity = quantity`) para que pase por la validación.
*   **`set quantity(value)`**: Es un método especial (*setter*). Se activa automáticamente siempre que intentamos cambiar la cantidad de un objeto. Comprueba que el valor no sea menor que 0 ni mayor que el `maxStack` permitido. La cantidad real se guarda de forma segura en `this._quantity`.
*   **`get quantity()`**: Es un método especial (*getter*). Se activa cuando leemos la propiedad cantidad, devolviendo el valor almacenado en `this._quantity`.
*   **`showInfo()`**: Devuelve una cadena de texto formateada (un *string*) con el nombre, la cantidad actual, el máximo permitido y la descripción. Es muy útil para mostrar la información limpiamente por consola.

## 3. Configuración Inicial del Inventario
*   **Matriz Bidimensional (`inventory`)**: Utilizamos un bucle `for` anidado para crear una cuadrícula de 4 filas (`ROWS`) y 9 columnas (`COLS`). Inicialmente, cada hueco se rellena con el valor `null` (vacío). Luego, asignamos manualmente instancias de `Item` a posiciones específicas para tener datos de prueba.

## 4. Funciones Auxiliares
Estas funciones no están directamente en el menú, pero ayudan a que las funciones principales trabajen mejor y sin repetir código.

*   **`isValidPos(r, c)`**: Recibe una fila y una columna. Devuelve `true` si esos números están dentro de los límites del inventario (0-3 para filas, 0-8 para columnas) y `false` en caso contrario. Evita que el programa falle si el usuario introduce coordenadas fuera del mapa.
*   **`findItemPositions(itemName)`**: Recorre toda la matriz buscando un nombre de objeto (ignorando si tiene mayúsculas o minúsculas). Devuelve un *Array* lleno de pequeños objetos literales `{ row, col, item }`. Si devuelve un array vacío, significa que el objeto no existe en el inventario.

## 5. Funciones Principales (Opciones del Menú)

### `showInventory()` (Opción 1)
Recorre la matriz de 4x9 fila por fila. Para cada fila, va construyendo una cadena de texto comprobando cada columna. Si encuentra `null`, escribe "[ VACÍO ]". Si encuentra un objeto, escribe su nombre y cantidad. Al terminar cada fila, la imprime en la consola.

### `showQuickAccessBar()` (Opción 2)
Se centra exclusivamente en la primera fila del inventario (`inventory[0]`). Utiliza el método `.forEach()` de los arrays para recorrerla rápidamente e imprimir por consola lo que hay en esos primeros 9 huecos.

### `searchItem()` (Opción 3)
Pide al usuario el nombre de un objeto. Utiliza la función auxiliar `findItemPositions()` para obtener todas sus ubicaciones. Si el array devuelto tiene elementos, los recorre con un `forEach` imprimiendo la fila, columna y la información del objeto. Si está vacío, avisa de que no se ha encontrado.

### `addItem()` (Opción 4)
Es la función más compleja y se divide en varias fases:
1.  Pide el nombre e intenta buscar si ya existe usando `findItemPositions()`.
2.  Si existe, auto-completa la descripción y el `maxStack` para evitar inconsistencias. Si no existe, pide estos datos al usuario.
3.  **Fase de llenado:** Busca stacks incompletos del mismo objeto y los rellena hasta su límite (`maxStack`), restando de la cantidad total que queremos añadir.
4.  **Fase de creación:** Si aún sobran unidades tras rellenar los huecos existentes, busca el primer espacio `null` disponible en el inventario y crea un nuevo objeto `Item` allí. Repite esto hasta que se coloquen todas las unidades o el inventario se llene.

### `moveItem()` (Opción 5)
Pide unas coordenadas de origen y unas de destino. 
*   Si el destino es `null` (hueco vacío), simplemente mueve la referencia del objeto y deja el origen en `null`.
*   Si en el destino hay un objeto del **mismo tipo**, calcula cuánto espacio libre le queda y transfiere las cantidades, vaciando el origen si se pasa todo, o dejando el sobrante en el origen si el destino se llena.
*   Si es de otro tipo, cancela la operación.

### `deleteItem()` (Opción 6)
Pide una fila y columna. Comprueba mediante `isValidPos` que la posición existe y que no es `null`. Luego, pide confirmación con `confirm()`. Si el usuario acepta, transforma ese hueco de la matriz de nuevo a `null`, "destruyendo" el objeto.

### `countFreeSpaces()` (Opción 7)
Recorre toda la matriz con dos bucles `for`. Cada vez que detecta un `null`, suma +1 a su contador general. Si además la fila actual es la `0`, suma +1 a un contador específico de la barra rápida. Imprime ambos resultados.

### `getMostQuantityStack()` (Opción 8)
Crea un objeto literal vacío (`quantities = {}`) que funciona como un diccionario. Recorre el inventario; por cada objeto que encuentra, suma su cantidad al diccionario agrupándolo por nombre. Finalmente, recorre ese diccionario para ver qué nombre acumuló la mayor cantidad total y lo muestra por pantalla.

## 6. El Bucle Principal
*   **`mainMenu()`**: Muestra la interfaz de texto mediante un `prompt()`. Está envuelta en un bucle `do...while` que garantiza que el menú volverá a aparecer una y otra vez tras ejecutar cada opción, deteniéndose únicamente si el usuario introduce '0' o pulsa cancelar. Un `switch` evalúa la entrada del usuario y llama a la función correspondiente explicada arriba.