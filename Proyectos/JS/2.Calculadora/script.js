let option=prompt("Introduce opción:"
    + "\n 1. Sumar"
    +"\n 2. Restar"
    +"\n 3. Multiplicar"
    +"\n 4. Dividir ");
let a=parseFloat(prompt("Introduce número"))
let b=parseFloat(prompt("Introduce otro"))
switch (option) {
    case "1":
        const suma=(a,b) =>a+b
        console.log(suma(a,b))
        break;
    case "2":
        const resta=(a,b) =>a-b;
        console.log(resta(a,b))
        break;
    case "3":
        const multiplicacion=(a,b) =>a*b;
        console.log(multiplicacion(a,b))
        break;
    case "4":
        const division=(a,b) =>a/b;
        console.log(division(a,b))
        break;

    default:
        console.log("Opción no válida");
        break;
}