const matriz = Array.from({ length: 5 }, () => 
  Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1)
);

console.log(matriz);


