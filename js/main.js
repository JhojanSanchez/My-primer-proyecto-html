//CATALOGO DE PRODUCTOS
const productos = [
    {
        id: "producto1",
        titulo: "Aeon Richie Eisler 60",
        imagen: "./img/producto1.jpg",
        categoria: {
            nombre: "Agresivos",
            id: "Agresivos"
        },
        precio: 1960000,
        tallas: [38, 39, 40, 41, 42, 43]
    },
    {
        id: "producto5",
        titulo: "Sway Carlos Bernal II",
        imagen: "./img/producto5.jpg",
        categoria: {
            nombre: "Agresivos",
            id: "Agresivos"
        },
        precio: 1449999,
        tallas: [38, 39, 40, 41, 42, 43]
    },
    {
        id: "producto6",
        titulo: "Aeon Nick Lomax Pro II 60",
        imagen: "./img/producto6.jpg",
        categoria: {
            nombre: "Agresivos",
            id: "Agresivos"
        },
        precio: 1606000,
        tallas: [38, 39, 40, 41, 42, 43]
    },
    {
        id: "producto7",
        titulo: "Aeon Mery Muñoz II Pro 60",
        imagen: "./img/producto7.jpg",
        categoria: {
            nombre: "Agresivos",
            id: "Agresivos"
        },
        precio: 1606000,
        tallas: [38, 39, 40, 41, 42, 43]
    },
    {
        id: "producto2",
        titulo: "Imperial Violet 80",
        imagen: "./img/producto2.jpg",
        categoria: {
            nombre: "Slalom",
            id: "Slalom"
        },
        precio: 849999,
        tallas: [36, 37, 38, 39, 40, 41]
    },
    {
        id: "producto8",
        titulo: "Sway Carlos Bernal II",
        imagen: "./img/producto8.jpg",
        categoria: {
            nombre: "Slalom",
            id: "Slalom"
        },
        precio: 1449999,
        tallas: [36, 37, 38, 39, 40, 41]
    },
    {
        id: "producto9",
        titulo: "Storm Meteor 80",
        imagen: "./img/producto9.jpg",
        categoria: {
            nombre: "Slalom",
            id: "Slalom"
        },
        precio: 906000,
        tallas: [36, 37, 38, 39, 40, 41]
    },
    {
        id: "producto10",
        titulo: "Storm Nicoly Pro 80",
        imagen: "./img/producto10.jpg",
        categoria: {
            nombre: "Slalom",
            id: "Slalom"
        },
        precio: 1100200,
        tallas: [36, 37, 38, 39, 40, 41]
    },
    {
        id: "producto3",
        titulo: "Next Grapefruit 100",
        imagen: "./img/producto3.jpg",
        categoria: {
            nombre: "Freeskate",
            id: "Freeskate"
        },
        precio: 1196000,
        tallas: [38, 39, 40, 41, 42, 43, 44, 45]
    },
    {
        id: "producto11",
        titulo: "Next 30th Anniversary 125",
        imagen: "./img/producto11.jpg",
        categoria: {
            nombre: "Freeskate",
            id: "Freeskate"
        },
        precio: 1449999,
        tallas: [38, 39, 40, 41, 42, 43, 44, 45]
    },
    {
        id: "producto12",
        titulo: "Next Mustard 125",
        imagen: "./img/producto12.jpg",
        categoria: {
            nombre: "Freeskate",
            id: "Freeskate"
        },
        precio: 1206000,
        tallas: [38, 39, 40, 41, 42, 43, 44, 45]
    },
    {
        id: "producto13",
        titulo: "Storm Nicoly Pro 80",
        imagen: "./img/producto13.jpg",
        categoria: {
            nombre: "Freeskate",
            id: "Freeskate"
        },
        precio: 1100200,
        tallas: [38, 39, 40, 41, 42, 43, 44, 45]
    },
    {
        id: "producto4",
        titulo: "Dragon Black 110",
        imagen: "./img/producto4.jpg",
        categoria: {
            nombre: "Carrera",
            id: "Carrera"
        },
        precio: 2600200,
        tallas: [37, 38, 39, 40, 41, 42]
    },
    {
        id: "producto14",
        titulo: "Dragon White 110",
        imagen: "./img/producto14.jpg",
        categoria: {
            nombre: "Carrera",
            id: "Carrera"
        },
        precio: 2449999,
        tallas: [37, 38, 39, 40, 41, 42]
    },
    {
        id: "producto15",
        titulo: "Arise Marathon",
        imagen: "./img/producto15.jpg",
        categoria: {
            nombre: "Carrera",
            id: "Carrera"
        },
        precio: 2206000,
        tallas: [37, 38, 39, 40, 41, 42]
    },
    {
        id: "producto16",
        titulo: "torm Nicoly Pro 80",
        imagen: "./img/producto16.jpg",
        categoria: {
            nombre: "Carrera",
            id: "Carrera"
        },
        precio: 2100200,
        tallas: [37, 38, 39, 40, 41, 42]
    },
    {
        id: "producto17",
        titulo: "Elite Yellow (include removable peak)",
        imagen: "./img/producto17.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "Accesorios"
        },
        precio: 350000,
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: "producto18",
        titulo: "Street Knee Pad",
        imagen: "./img/producto18.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "Accesorios"
        },
        precio: 249999,
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: "producto19",
        titulo: "Carrera Glove",
        imagen: "./img/producto19.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "Accesorios"
        },
        precio: 360000,
        tallas: ["S", "M", "L", "XL"]
    },
    {
        id: "producto20",
        titulo: "Aly Dual Set",
        imagen: "./img/producto20.jpg",
        categoria: {
            nombre: "Accesorios",
            id: "Accesorios"
        },
        precio: 520000,
        tallas: ["S/M", "L/XL"]
    }
]

//CODIGO DE PROGRAMACION
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");

function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = "";
    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        let tallasHTML = "";
        if (producto.tallas && producto.tallas.length > 0) {
            tallasHTML = `
                <div class="producto-tallas">
                    <label for="size-${producto.id}">Talla:</label>
                    <select id="size-${producto.id}" class="select-talla" data-product-id="${producto.id}">
                        ${producto.tallas.map(talla => `<option value="${talla}">${talla}</option>`).join('')}
                    </select>
                </div>
            `;
        }

        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio.toLocaleString()}</p>
                ${tallasHTML}
                <button class="producto-agregar" data-product-id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
}


// Inicializar productos
cargarProductos(productos);

// Manejo de categorías
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

// El manejo de clicks en "Agregar" ahora es responsabilidad de CartSystem
// (ver js/cart-system.js que tiene un listener delegado para [data-product-id])
