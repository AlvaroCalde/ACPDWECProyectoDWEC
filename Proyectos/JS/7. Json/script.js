const jugador ={
    nombre: "Alex",
    nivel : 3,
    activo : true
};

localStorage.setItem( "jugador", JSON.stringify(jugador) );

console.log(jugador.nombre);
console.log(jugador.nivel);

console.log(typeof jugador.nombre);
console.log(typeof jugador.nivel);
console.log(jugador.nivel+1);

const guardado = JSON.parse( localStorage.getItem("jugador") );
