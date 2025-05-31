//CATALOGO DE PRODUCTOS
const productos=[
{
    id:"producto1",
    titulo:"Aeon Richie Eisler 60",
    imagen:"./img/producto1.jpg",
    categoria:{
        nombre:"Agresivos",
        id:"Agresivos" // campo clave para enlazar con index_car.html
    },
    precio:1960000
},

{
    id:"producto5",
    titulo:"Sway Carlos Bernal II",
    imagen:"./img/producto5.jpg",
    categoria:{
        nombre:"Agresivos",
        id:"Agresivos" // campo clave para enlazar con index_car.html
    },
    precio:1449999
},

{
    id:"producto6",
    titulo:"Aeon Nick Lomax Pro II 60",
    imagen:"./img/producto6.jpg",
    categoria:{
        nombre:"Agresivos",
        id:"Agresivos" // campo clave para enlazar con index_car.html
    },
    precio:1606000
},

{
    id:"producto7",
    titulo:"Aeon Mery Muñoz II Pro 60",
    imagen:"./img/producto7.jpg",
    categoria:{
        nombre:"Agresivos",
        id:"Agresivos" // campo clave para enlazar con index_car.html
    },
    precio:1606000
},

{
    id:"producto2",
    titulo:"Imperial Violet 80",
    imagen:"./img/producto2.jpg",
    categoria:{
        nombre:"Slalom",
        id:"Slalom" // campo clave para enlazar con index_car.html
    },
    precio:849999
},

{
    id:"producto8",
    titulo:"Sway Carlos Bernal II",
    imagen:"./img/producto8.jpg",
    categoria:{
        nombre:"Slalom",
        id:"Slalom" // campo clave para enlazar con index_car.html
    },
    precio:1449999
},

{
    id:"producto9",
    titulo:"Storm Meteor 80",
    imagen:"./img/producto9.jpg",
    categoria:{
        nombre:"Slalom",
        id:"Slalom" // campo clave para enlazar con index_car.html
    },
    precio:906000
},

{
    id:"producto10",
    titulo:"Storm Nicoly Pro 80",
    imagen:"./img/producto10.jpg",
    categoria:{
        nombre:"Slalom",
        id:"Slalom" // campo clave para enlazar con index_car.html
    },
    precio:1100200
},

{
    id:"producto3",
    titulo:"Next Grapefruit 100",
    imagen:"./img/producto3.jpg",
    categoria:{
        nombre:"Freeskate",
        id:"Freeskate" // campo clave para enlazar con index_car.html
    },
    precio:1196000
},

{
    id:"producto11",
    titulo:"Next 30th Anniversary 125",
    imagen:"./img/producto11.jpg",
    categoria:{
        nombre:"Freeskate",
        id:"Freeskate" // campo clave para enlazar con index_car.html
    },
    precio:1449999
},

{
    id:"producto12",
    titulo:"Next Mustard 125",
    imagen:"./img/producto12.jpg",
    categoria:{
        nombre:"Freeskate",
        id:"Freeskate" // campo clave para enlazar con index_car.html
    },
    precio:1206000
},

{
    id:"producto13",
    titulo:"Storm Nicoly Pro 80",
    imagen:"./img/producto13.jpg",
    categoria:{
        nombre:"Freeskate",
        id:"Freeskate" // campo clave para enlazar con index_car.html
    },
    precio:1100200
},

{
    id:"producto4",
    titulo:"Dragon Black 110",
    imagen:"./img/producto4.jpg",
    categoria:{
        nombre:"Carrera",
        id:"Carrera" // campo clave para enlazar con index_car.html
    },
    precio:2600200
},

{
    id:"producto14",
    titulo:"Dragon White 110",
    imagen:"./img/producto14.jpg",
    categoria:{
        nombre:"Carrera",
        id:"Carrera" // campo clave para enlazar con index_car.html
    },
    precio:2449999
},

{
    id:"producto15",
    titulo:"Arise Marathon",
    imagen:"./img/producto15.jpg",
    categoria:{
        nombre:"Carrera",
        id:"Carrera" // campo clave para enlazar con index_car.html
    },
    precio:2206000
},

{
    id:"producto16",
    titulo:"torm Nicoly Pro 80",
    imagen:"./img/producto16.jpg",
    categoria:{
        nombre:"Carrera",
        id:"Carrera" // campo clave para enlazar con index_car.html
    },
    precio:2100200
},

{
    id:"producto17",
    titulo:"Elite Yellow (include removable peak)",
    imagen:"./img/producto17.jpg",
    categoria:{
        nombre:"Accesorios",
        id:"Accesorios" // campo clave para enlazar con index_car.html
    },
    precio:350000
},

{
    id:"producto18",
    titulo:"Street Knee Pad",
    imagen:"./img/producto18.jpg",
    categoria:{
        nombre:"Accesorios",
        id:"Accesorios" // campo clave para enlazar con index_car.html
    },
    precio:249999
},

{
    id:"producto19",
    titulo:"Carrera Glove",
    imagen:"./img/producto19.jpg",
    categoria:{
        nombre:"Accesorios",
        id:"Accesorios" // campo clave para enlazar con index_car.html
    },
    precio:360000
},

{
    id:"producto20",
    titulo:"Aly Dual Set",
    imagen:"./img/producto20.jpg",
    categoria:{
        nombre:"Accesorios",
        id:"Accesorios" // campo clave para enlazar con index_car.html
    },
    precio:520000
}

]


//CODIGO DE PROGRAMACION

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
