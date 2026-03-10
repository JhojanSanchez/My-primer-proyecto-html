// Cargar productos del carrito de forma segura
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

// Referencias principales del Carrito
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
const contenedorTotal = document.querySelector("#total");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Referencias del Checkout (Formulario)
const formularioCheckout = document.querySelector("#checkout-form");
const contenedorCheckout = document.querySelector("#checkout-form-container");
const botonCancelarCheckout = document.querySelector("#boton-cancelar-checkout");
const metodoPagoSelect = document.querySelector("#checkout-metodo-pago");

// Referencias del Resumen de Pago
const resumenSubtotal = document.querySelector("#resumen-subtotal");
const resumenDescuento = document.querySelector("#resumen-descuento");
const resumenTotal = document.querySelector("#resumen-total");

function cargarProductosCarrito() {
    if (productosEnCarrito && productosEnCarrito.length > 0) {
        if (contenedorCarritoVacio) contenedorCarritoVacio.classList.add("disabled");
        if (contenedorCarritoProductos) {
            contenedorCarritoProductos.classList.remove("disabled");
            contenedorCarritoProductos.innerHTML = "";

            productosEnCarrito.forEach(producto => {
                const div = document.createElement("div");
                div.classList.add("carrito-producto");
                div.innerHTML = `
                    <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small>Título</small>
                        <h3>${producto.titulo}</h3>
                    </div>
                    <div class="carrito-producto-talla">
                        <small>Talla</small>
                        <p>${producto.size}</p>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small>Cantidad</small>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small>Precio</small>
                        <p>$${producto.precio.toLocaleString()}</p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small>Subtotal</small>
                        <p>$${(producto.precio * producto.cantidad).toLocaleString()}</p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}-${producto.size}"><i class="bi bi-trash-fill"></i></button>
                `;
                contenedorCarritoProductos.append(div);
            });
        }
        if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.remove("disabled");
        if (contenedorCarritoComprado) contenedorCarritoComprado.classList.add("disabled");

    } else {
        if (contenedorCarritoVacio) contenedorCarritoVacio.classList.remove("disabled");
        if (contenedorCarritoProductos) contenedorCarritoProductos.classList.add("disabled");
        if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.add("disabled");
        if (contenedorCarritoComprado) contenedorCarritoComprado.classList.add("disabled");
        if (contenedorCheckout) contenedorCheckout.classList.add("disabled");
    }

    actualizarBotonesEliminar();
    actualizarTotal();
}

function actualizarBotonesEliminar() {
    const botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => `${producto.id}-${producto.size}` === idBoton);

    productosEnCarrito.splice(index, 1);
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();
}

if (botonVaciar) {
    botonVaciar.addEventListener("click", () => {
        productosEnCarrito.length = 0;
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    });
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    if (contenedorTotal) contenedorTotal.innerText = `$${totalCalculado.toLocaleString()}`;

    if (resumenSubtotal) {
        resumenSubtotal.innerText = `$${totalCalculado.toLocaleString()}`;
        actualizarResumenPago(totalCalculado);
    }
}

function actualizarResumenPago(total) {
    if (!metodoPagoSelect || !resumenDescuento || !resumenTotal) return;

    const metodo = metodoPagoSelect.value;
    let descPorcentaje = 0;

    if (metodo === "tarjeta") descPorcentaje = 0.05;
    else if (metodo === "efectivo") descPorcentaje = 0.02;

    const descuento = total * descPorcentaje;
    const final = total - descuento;

    resumenDescuento.innerText = `-$${descuento.toLocaleString()}`;
    resumenTotal.innerText = `$${final.toLocaleString()}`;
    return { final, descuento };
}

// Eventos de Navegación del Checkout
if (botonComprar) {
    botonComprar.addEventListener("click", () => {
        console.log("Abriendo checkout...");
        if (contenedorCarritoProductos) contenedorCarritoProductos.classList.add("disabled");
        if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.add("disabled");
        if (contenedorCheckout) {
            contenedorCheckout.classList.remove("disabled");
            actualizarTotal();
            // Subir al inicio para ver el formulario
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
}

if (botonCancelarCheckout) {
    botonCancelarCheckout.addEventListener("click", () => {
        if (contenedorCarritoProductos) contenedorCarritoProductos.classList.remove("disabled");
        if (contenedorCarritoAcciones) contenedorCarritoAcciones.classList.remove("disabled");
        if (contenedorCheckout) contenedorCheckout.classList.add("disabled");
    });
}

if (metodoPagoSelect) {
    metodoPagoSelect.addEventListener("change", () => {
        const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        actualizarResumenPago(totalCalculado);
    });
}

// Envío Final del Pedido a Supabase
if (formularioCheckout) {
    formularioCheckout.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Enviando pedido a Supabase...");

        const totalCalc = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        const { final, descuento } = actualizarResumenPago(totalCalc);

        const pedido = {
            nombre_comprador: document.querySelector("#checkout-nombre").value,
            email_comprador: document.querySelector("#checkout-email").value,
            telefono_comprador: document.querySelector("#checkout-telefono").value,
            direccion_comprador: document.querySelector("#checkout-direccion").value,
            metodo_pago: metodoPagoSelect.value,
            total: final,
            descuento_aplicado: descuento,
            productos: productosEnCarrito
        };

        const submitBtn = formularioCheckout.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerText = "Procesando...";

        try {
            if (typeof db === 'undefined') throw new Error("Supabase client (db) is not defined");

            const { data, error } = await db.from('pedidos').insert([pedido]);
            if (error) throw error;

            // Éxito: Limpiar carrito
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

            if (contenedorCheckout) contenedorCheckout.classList.add("disabled");
            if (contenedorCarritoComprado) contenedorCarritoComprado.classList.remove("disabled");

            if (typeof swal !== 'undefined') {
                swal("¡Pedido Confirmado!", "Muchas gracias por tu compra. Te contactaremos pronto para el envío.", "success");
            } else {
                alert("¡Pedido Confirmado! Muchas gracias.");
            }
        } catch (err) {
            console.error("Error al guardar pedido:", err);
            alert("Hubo un error al procesar tu compra: " + err.message);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerText = "Confirmar Pedido";
        }
    });
}

// Lógica para el menú móvil en la tienda
function initMobileMenu() {
    const wrapper = document.querySelector('.wrapper');
    if (!wrapper) return;

    // Crear el botón de hamburguesa si no existe
    if (!document.querySelector('.mobile-menu-toggle')) {
        const toggle = document.createElement('div');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '<i class="bi bi-list"></i>';
        document.body.prepend(toggle);

        const aside = document.querySelector('aside');
        toggle.addEventListener('click', () => {
            aside.classList.toggle('active');
            toggle.innerHTML = aside.classList.contains('active') ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
        });

        // Cerrar al hacer clic en un link
        document.querySelectorAll('.boton-menu').forEach(btn => {
            btn.addEventListener('click', () => {
                aside.classList.remove('active');
                toggle.innerHTML = '<i class="bi bi-list"></i>';
            });
        });
    }
}

// Inicializar página
cargarProductosCarrito();
initMobileMenu();
