// Variable global para que el cart-system pueda encontrar los productos
window.productos = [];

async function loadProducts(category = null) {
    // Buscar el contenedor (puede ser .products-grid o #contenedor-productos)
    const productsGrid = document.querySelector('.products-grid') || document.querySelector('#contenedor-productos');
    if (!productsGrid) return;

    try {
        let query = db.from('productos').select('*');
        if (category && category !== 'todos') {
            query = query.eq('categoria', category);
        }

        const { data: dbProducts, error } = await query;
        if (error) throw error;

        // Mapear datos
        let mappedProducts = dbProducts.map(p => {
            // Re-recrear el array de imágenes si no existe en la base de datos
            let images = [];
            if (p.imagen_url.includes('producto') && !p.imagen_url.includes('-')) {
                const base = p.imagen_url.replace('.jpg', '');
                images = [p.imagen_url, `${base}-2.jpg`, `${base}-3.jpg`];
            } else {
                images = [p.imagen_url];
            }

            return {
                id: p.id.toString(),
                titulo: p.nombre,
                imagen: p.imagen_url,
                imagenes: images,
                precio: p.precio,
                categoria: p.categoria,
                stock: p.stock,
                tallas: getTallasPorCategoria(p.categoria)
            };
        });

        // Lógica de Destacados para el index.html principal
        if (!category && (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/'))) {
            const categories = ['agresivo', 'slalom', 'freeskate', 'carrera'];
            const featured = [];
            categories.forEach(cat => {
                const product = mappedProducts.find(p => p.categoria.toLowerCase() === cat);
                if (product) featured.push(product);
            });
            window.productos = featured;
        } else {
            window.productos = mappedProducts;
        }

        productsGrid.innerHTML = '';

        if (window.productos.length === 0) {
            productsGrid.innerHTML = '<p>No hay productos disponibles.</p>';
            return;
        }

        // Renderizar productos
        window.productos.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = productsGrid.id === 'contenedor-productos' ? 'producto' : 'product-item';

            const formattedPrice = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0
            }).format(product.precio);

            let tallasHTML = '';
            if (product.tallas && product.tallas.length > 0) {
                tallasHTML = `
                    <div class="producto-tallas">
                        <label for="size-${product.id}">Talla:</label>
                        <select id="size-${product.id}" class="select-talla">
                            ${product.tallas.map(t => `<option value="${t}">${t}</option>`).join('')}
                        </select>
                    </div>
                `;
            }

            // Usar la estructura adecuada según la página
            if (productsGrid.id === 'contenedor-productos') {
                productElement.innerHTML = `
                    <img class="producto-imagen" src="${product.imagen}" alt="${product.titulo}">
                    <div class="producto-detalles">
                        <h3 class="producto-titulo">${product.titulo}</h3>
                        <p class="producto-precio">${formattedPrice}</p>
                        ${tallasHTML}
                        <button class="producto-agregar" data-product-id="${product.id}">Agregar</button>
                    </div>
                `;
            } else {
                productElement.innerHTML = `
                    <div class="product-carousel">
                        ${product.imagenes.map((img, index) => `
                            <img src="${img}" alt="${product.titulo}" class="${index === 0 ? 'active' : ''}">
                        `).join('')}
                        <button class="carousel-prev">&lt;</button>
                        <button class="carousel-next">&gt;</button>
                    </div>
                    <div class="product-info">
                        <h3>${product.titulo}</h3>
                        <span class="price">${formattedPrice}</span>
                        <p class="stock-info">Stock: ${product.stock}</p>
                        ${tallasHTML}
                        <button class="btn" data-product-id="${product.id}">Añadir al carrito</button>
                    </div>
                `;
            }
            productsGrid.appendChild(productElement);
        });

        // Inicializar carruseles dinámicos
        if (typeof initCarousels === 'function') initCarousels();

    } catch (err) {
        console.error('Error:', err);
        productsGrid.innerHTML = '<p>Error al cargar productos.</p>';
    }
}

// Función auxiliar para asignar tallas por categoría
function getTallasPorCategoria(categoria) {
    const cat = categoria.toLowerCase();
    if (cat === 'agresivo') return [38, 39, 40, 41, 42, 43];
    if (cat === 'slalom') return [36, 37, 38, 39, 40, 41];
    if (cat === 'freeskate') return [38, 39, 40, 41, 42, 43, 44, 45];
    if (cat === 'carrera') return [37, 38, 39, 40, 41, 42];
    if (cat === 'accesorios') return ['S', 'M', 'L', 'XL'];
    return [];
}

document.addEventListener('DOMContentLoaded', () => {
    // Detectar categoría basada en la URL o clase de sección
    const section = document.querySelector('section[class^="featured-products"]');
    const botonesCategorias = document.querySelectorAll(".boton-categoria");
    const tituloPrincipal = document.querySelector("#titulo-principal");

    let initialCategory = null;

    if (section) {
        if (section.classList.contains('featured-products2')) initialCategory = 'agresivo';
        else if (section.classList.contains('featured-products3')) initialCategory = 'slalom';
        else if (section.classList.contains('featured-products4')) initialCategory = 'freeskate';
        else if (section.classList.contains('featured-products5')) initialCategory = 'carrera';
        else if (section.classList.contains('featured-products6')) initialCategory = 'accesorios';
    }

    // Manejo de botones de categoría (para index_car.html)
    if (botonesCategorias.length > 0) {
        botonesCategorias.forEach(boton => {
            boton.addEventListener("click", (e) => {
                botonesCategorias.forEach(b => b.classList.remove("active"));
                e.currentTarget.classList.add("active");

                const catId = e.currentTarget.id;
                if (tituloPrincipal) {
                    tituloPrincipal.innerText = catId === 'todos' ? "Todos los productos" : catId;
                }
                loadProducts(catId);
            });
        });
    }

    loadProducts(initialCategory);
    
    // Si estamos en index_car.html, inicializar el menú móvil
    if (document.querySelector('#contenedor-productos')) {
        if (typeof initMobileMenu === 'function') initMobileMenu();
    }
});
