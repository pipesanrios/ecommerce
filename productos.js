
/* Bojeto de productos */

class Producto {
    constructor(nombre, precio, imagen, tipo, idproducto) {
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.tipo = tipo;
        this.cantidad = 1;
        this.idproducto = idproducto;

    }
}




/* Productos */

const sixPackHeineken = new Producto("Six Pack Heineken", 1800, "imagenes/productos/Six-Pack-Heineken.png", "Cerveza", 1);
const sixPackCorona = new Producto("Six Pack Corona", 1600, "imagenes/productos/Six-Pack-Corona.png", "Cerveza", 2);
const twelvePackBudweiser = new Producto("Twelve Pack Budweiser", 2200, "imagenes/productos/Six-Budweiser-American.png", "Cerveza", 3);
const sixPackbrahma = new Producto("Six Pack BRAHMA", 1300, "imagenes/productos/Six-Brahma.jpg", "Cerveza", 4);
const sixPackSchneider = new Producto("Six Pack Schneider", 1640, "imagenes/productos/six-pack-schneider.jpg", "Cerveza", 5);
const sixPackQuilmes = new Producto("Six Pack Quilmes", 1200, "imagenes/productos/six-pack-quilmes.jpg", "Cerveza", 6)
const ronDiplomaticoReserva = new Producto("Ron Diplomatico Reserva", 6850, "imagenes/productos/diplomatico-reservagrande.jpg", "Ron", 7);
const ronBacardiAñejo = new Producto("Ron Bacardi Añejo", 3750, "imagenes/productos/bacardi.jpg", "Ron", 8);
const ronBarceló = new Producto("Ron Barceló", 2380, "imagenes/productos/barcelo.jpg", "Ron", 9);
const ronSantaTeresa = new Producto("Ron Santa Teresa 1796", 7350, "imagenes/productos/santa-teresa.jpg", "Ron", 10);
const whiskyBuchanan = new Producto("Whisky Buchanan", 12550, "imagenes/productos/buchanans.jpg", "Whisky", 11);
const whiskyOldParr = new Producto("Whisky Old Parr", 7850, "imagenes/productos/Old_parr.png", "Whisky", 12);
const whiskyChivasRegal = new Producto("Whisky Chivas Regal", 7850, "imagenes/productos/chivas-regal.jpg", "Whisky", 13);
const whiskyJohnnieWalker = new Producto("Johnnie Walker Red Label", 6850, "imagenes/productos/whisky_johnnie_walker_red_label.jpg", "Whisky", 14);
const vodkaAbsolut = new Producto("Vodka Absolut", 2650, "imagenes/productos/absolut.jpg", "Vodka", 15);
const vodkaSmirnoff = new Producto("Vodka Smirnoff", 1800, "imagenes/productos/smirnoff.png", "Vodka", 16);
const vodkaCiroc = new Producto("Vodka Ciroc", 1600, "imagenes/productos/ciroc.jpg", "Vodka", 17);
const vodkaSernova = new Producto("Vodka Sernova + Speed", 1700, "imagenes/productos/sernova.png", "Vodka", 18);


/* Array de productos */

const stockProductos = [sixPackHeineken, sixPackCorona, twelvePackBudweiser, sixPackbrahma, sixPackSchneider,
    sixPackQuilmes, ronDiplomaticoReserva, ronBacardiAñejo, ronBarceló, ronSantaTeresa, whiskyBuchanan, whiskyOldParr,
    whiskyChivasRegal, whiskyJohnnieWalker, vodkaAbsolut, vodkaSmirnoff, vodkaCiroc, vodkaSernova,];

console.log(stockProductos);



/* Creando carrito */

let carrito = [];

//tomar del localStorage.

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");


const mostrarProductos = () => {
    stockProductos.forEach((producto) => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
        <div class="card" style="width: 17rem;">
            <img src=${producto.imagen} class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title"> ${producto.nombre}</h5>
                <h5 class="card-title">Precio: $ ${producto.precio}</h5>
                <h5 class="card-title"> Licor: ${producto.tipo}</h5>

                <button class="btn btn-success" id="boton${producto.idproducto}">Agrgar al carrito</button>
            </div>
        </div>
        `
        contenedorProductos.appendChild(card);

        const boton = document.getElementById(`boton${producto.idproducto}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.idproducto)

            Toastify({

                text: "Producto agregado",
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        })
    })
}

const agregarAlCarrito = (id) => {
    const producto = stockProductos.find((producto) => producto.idproducto === id);
    const productoEnCarrito = carrito.find((producto) => producto.idproducto === id)
    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    sumaTotal();
    mostrarCarrito();
    sumaBurbuja()

}

mostrarProductos();

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();

})


const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach((producto) => {
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card" >
        
            <div class="card-body">
                <h5 class="card-title"> ${producto.nombre}</h5>
                <h5 class="card-title fs-6">Precio: $ ${producto.precio}</h5>
                <p class="card-text">Cantidad: ${producto.cantidad}</p>
                <button class="btn btn-success" id="eliminar${producto.idproducto}">Eliminar Producto</button>
            </div>
        </div>
        `
        contenedorCarrito.appendChild(card);

        const boton = document.getElementById(`eliminar${producto.idproducto}`);
        boton.addEventListener("click", () => {


            /* SWEET ALERT */
            Swal.fire({
                title: '¿Desea eliminar este producto?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar!',
                confirmButtonColor: '#275c27',
                cancelButtonText: `Cancelar`,
                cancelButtonColor: '#d33',

            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Eliminado',
                        icon: 'success',
                        confirmButtonText: 'Ok',
                        confirmButtonColor: '#275c27'

                    })

                    eliminarDelCarrito(producto.idproducto)
                }


            })
        })
    })


    sumaTotal();
    pesoDolar();
}

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.idproducto === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();


    localStorage.setItem("carrito", JSON.stringify(carrito));

}

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {

    Swal.fire({
        title: '¿Desea vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, vaciar!',
        confirmButtonColor: '#275c27',
        cancelButtonText: `Cancelar`,
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Se eliminaron todos los productos!',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#275c27'
            })
            eliminarTodo();
        }
    })

})

const eliminarTodo = () => {
    carrito = [];
    mostrarCarrito();

    localStorage.clear();
}

const total = document.getElementById("total");

const sumaTotal = () => {
    let totalCompra = 0;

    carrito.forEach((producto) => {
        totalCompra += producto.precio * producto.cantidad;
    })

    total.innerHTML = ` $${totalCompra}`;
}


const burbujaCarrito = document.getElementById("burbujaCarrito");

const sumaBurbuja = () => {
    let totalBurbuja = 0;

    carrito.forEach((producto) => {
        totalBurbuja = producto.cantidad;
    })

    burbujaCarrito.innerHTML = `${totalBurbuja}`;
}


const criptoCotizacion = "https://criptoya.com/api/dolar";

const precioUsd = document.getElementById("precioDolar");



setInterval(() => {
    fetch(criptoCotizacion)
        .then(Response => Response.json())
        .then(({ blue }) => {

            precioDolar.innerHTML = `<p>$ ${blue} </p>`


        }).catch(error => console.log(error))
}, 3000)



const totalUsd = document.getElementById("totalUsd")

const pesoDolar = () => {
    let totalCompraUsd = 0;

    carrito.forEach((producto) => {
        totalCompraUsd += (producto.precio * producto.cantidad / 289)
    })

    totalUsd.innerHTML = ` $${totalCompraUsd}`;
}


const comprar = document.getElementById("comprar")

comprar.addEventListener("click", () => {
    Swal.fire({
        title: '¿Desea reazlizar esta compra?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, comprar!',
        confirmButtonColor: '#275c27',
        cancelButtonText: `Cancelar`,
        cancelButtonColor: '#d33',
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '¡¡Felicidades!! se cargó el pago a su tarjeta de credito',
                text: `Pedido en camino`,
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#275c27'
            })
            eliminarTodo();
        }
    })
})