/**
 * Footer Component
 * Centralizes the footer content and structure.
 */

function initFooter() {
    const footerHTML = `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-logo">
                    <img src="img/LogoSS.png" alt="SkateShop" height="150" width="260" >
                    <p>Tu tienda de confianza para todo tipo de patines y accesorios.</p>
                </div>
                <div class="footer-links">
                    <h3>Enlaces rápidos</h3>
                    <ul>
                        <li><a href="index.html#home">Inicio</a></li>
                        <li><a href="index.html#products">Productos</a></li>
                        <li><a href="index.html#videos">Videos</a></li>
                        <li><a href="index.html#about">Nosotros</a></li>
                        <li><a href="./index_car.html">Tienda</a></li>
                        <li><a href="index.html#contact">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Categorías</h3>
                    <ul>
                        <li><a href="./agresivo.html">Patines Agresivos</a></li>
                        <li><a href="./slalom.html">Patines Slalom</a></li>
                        <li><a href="./freeskate.html">Patines Freeskate</a></li>
                        <li><a href="./carrera.html">Patines de carrera</a></li>
                        <li><a href="./accesorios.html">Accesorios</a></li>
                    </ul>
                </div>
                <div class="footer-newsletter">
                    <h3>Boletín informativo</h3>
                    <p>Suscríbete para recibir ofertas y novedades.</p>
                    <form id="newsletter-form">
                        <input type="email" placeholder="Tu email" required>
                        <button type="submit" class="btn">Suscribirse</button>
                    </form>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 SkateShop. Todos los derechos reservados Jhojan Sanchez (Dev).</p>
            </div>
        </div>
    </footer>
    `;

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
        setupFooterLogic();
    }
}

function setupFooterLogic() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias por suscribirte!');
            newsletterForm.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', initFooter);
