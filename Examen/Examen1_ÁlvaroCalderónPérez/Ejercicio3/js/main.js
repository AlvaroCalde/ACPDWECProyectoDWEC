
/*
------------------------------------------------------------
    EJERCICIO 3: DEPURACIÓN DE CÓDIGO
    Corrige los 10 errores que hay en el siguiente código.
------------------------------------------------------------
*/

const nombre = "Alex";
let edad = "20";
/*
dará error porque al declararlo como constante no se debe cambiar si valor
se debería definir como un let o var
const mayorEdad = false;
*/
let mayorEdad = false;
if (edad >= 18) {
    mayorEdad = true;
}
/*
dará un error porque la función se llama .toUpperCase() en esa linea hay una c minúscula
console.log("Usuario: " + nombre.toUppercase());
*/
console.log("Usuario: " + nombre.toUpperCase());

let numeros = [10, 20, 30, 40];

for (let i = 0; i <= numeros.length; i++) {
    console.log(numeros[i]);
}

function calcularMedia(lista) {
    let suma = 0;

    lista.forEach(numero => {
        suma = numero;
    });

    return suma / lista.length;
}

console.log("Media: " + calcularMedia(numeros).toFixed(2));

let precio = "19.99";
/*
esto dará un error, con === compruebas también que son del mismo tipo pero precio contiene un String
y lo estás igualando con un entero
if (precio === 19.99) {
    console.log("Precio correcto");
}
    */

if (precio == 19.99) {
    console.log("Precio correcto");
}

const aleatorio = Math.floor(Math.random * 10) + 1;

console.log("Número aleatorio: " + aleatorio);