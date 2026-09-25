let products=[];
class Producto{
    constructor(nombre,precio,stock){
        this.nombre=nombre;
        this._precio=precio;
        this.stock=stock;
    }
    mostrarProducto(){
        console.log("Nombre: "+this.nombre+" "+"\nPrecio: "+this._precio)
    }
    valorTotalS(){
        console.log("Valor total del stock: "+this._precio*this.stock)
    }
    set precio(precio){
            this._precio=(precio>0) ? precio : 0;
    }
}

products=[
    new Producto("Teclado",29.99,15),
    new Producto("Ratón",14.50,30)
]

products.forEach(product => {
    console.log(product.mostrarProducto());
    console.log(product.valorTotalS());
})
