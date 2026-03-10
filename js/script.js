document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    hamburgerMenu.addEventListener('click', function () {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            if (this.classList.contains('hamburger-menu')) return;

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                hamburgerMenu.classList.remove('active');
                navbar.classList.remove('active');
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.category-item, .product-item, .testimonial-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.category-item, .product-item, .testimonial-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load


    // Cerrar el modal
    document.querySelector('.close').addEventListener('click', function () {
        document.getElementById('imageModal').style.display = "none";
    });

    // Search functionality

    // Login State Management
    const userBtn = document.getElementById('user-menu-btn');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (isLoggedIn && userBtn) {
        userBtn.innerHTML = `<span class="user-name">${username}</span> <i class="fas fa-sign-out-alt"></i>`;
        userBtn.href = '#';
        userBtn.title = 'Cerrar sesión';

        userBtn.addEventListener('click', function (e) {
            e.preventDefault();
            if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                window.location.reload();
            }
        });
    }

    // Add styles for user-name
    const userStyle = document.createElement('style');
    userStyle.textContent = `
        .user-name {
            font-size: 0.9rem;
            font-weight: 600;
            margin-right: 5px;
            color: var(--primary-color);
        }
        .user-btn {
            color: var(--dark-color);
            font-size: 1.1rem;
            margin-left: 20px;
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: color 0.3s ease;
        }
        .user-btn:hover {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(userStyle);

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" placeholder="Buscar productos...">
                <button class="search-submit"><i class="fas fa-search"></i></button>
                <button class="search-close"><i class="fas fa-times"></i></button>
            </div>
        `;

        document.body.appendChild(searchContainer);
        searchContainer.style.opacity = '0';
        searchContainer.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            searchContainer.style.opacity = '1';
            searchContainer.style.transform = 'translateY(0)';
            searchContainer.querySelector('input').focus();
        }, 10);

        const closeBtn = searchContainer.querySelector('.search-close');
        closeBtn.addEventListener('click', function () {
            searchContainer.style.opacity = '0';
            searchContainer.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                searchContainer.remove();
            }, 300);
        });
    });

    // Add CSS for search container
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .search-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            transition: all 0.3s ease;
        }
        
        .search-box {
            position: relative;
            width: 80%;
            max-width: 600px;
        }
        
        .search-box input {
            width: 100%;
            padding: 20px 60px 20px 20px;
            font-size: 1.5rem;
            border: none;
            border-radius: 50px;
            background-color: white;
        }
        
        .search-submit, .search-close {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--dark-color);
        }
        
        .search-submit {
            right: 65px;
        }
        
        .search-close {
            right: 20px;
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(searchStyle);

    // Formulario de Contacto - Integración con Supabase
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const message = document.getElementById('contact-message').value;
            const submitBtn = contactForm.querySelector('button[type="submit"]');

            // Deshabilitar botón mientras envía
            submitBtn.disabled = true;
            submitBtn.innerText = 'Enviando...';

            try {
                const { data, error } = await db
                    .from('contactos')
                    .insert([
                        { nombre: name, email: email, mensaje: message }
                    ]);

                if (error) throw error;

                alert('¡Gracias por tu mensaje! Lo recibimos correctamente.');
                contactForm.reset();
            } catch (err) {
                console.error('Error al enviar mensaje:', err);
                alert('Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo.');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = 'Enviar mensaje';
            }
        });
    }
});

// JavaScript - Control manual + automático
function initCarousels() {
    document.querySelectorAll('.product-carousel').forEach(carousel => {
        // Evitar doble inicialización
        if (carousel.dataset.initialized) return;
        carousel.dataset.initialized = "true";

        const images = carousel.querySelectorAll('img');
        if (images.length <= 1) return; // No necesita carrusel si hay una sola imagen

        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentIndex = 0;
        let intervalId;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Automático
        function startCarousel() {
            intervalId = setInterval(nextImage, 4000);
        }

        // Manual
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearInterval(intervalId);
                nextImage();
                startCarousel();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                clearInterval(intervalId);
                prevImage();
                startCarousel();
            });
        }

        // Iniciar
        startCarousel();

        // Pausa al interactuar
        carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
        carousel.addEventListener('mouseleave', startCarousel);
    });
}

// Inicializar carruseles estáticos existentes (si los hay)
initCarousels();

// Lightbox para productos
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentProductImages = [];
    let currentIndex = 0;

    // Delegación de eventos para abrir lightbox (funciona con productos dinámicos)
    document.addEventListener('click', (e) => {
        const img = e.target.closest('.product-carousel img, .product-item img');
        if (img && !e.target.closest('.carousel-prev') && !e.target.closest('.carousel-next')) {
            const productContainer = img.closest('.product-item');
            if (!productContainer) return;

            // Obtener todas las imágenes válidas del carrusel de este producto
            currentProductImages = Array.from(productContainer.querySelectorAll('.product-carousel img'))
                .filter(i => i.style.display !== 'none')
                .map(i => ({
                    src: i.src,
                    alt: i.alt
                }));

            if (currentProductImages.length === 0) {
                currentProductImages = [{ src: img.src, alt: img.alt }];
            }

            currentIndex = currentProductImages.findIndex(item => item.src === img.src);
            if (currentIndex === -1) currentIndex = 0;

            lightbox.style.display = 'flex';
            updateLightboxImage();
        }
    });

    // Actualizar imagen del lightbox
    function updateLightboxImage() {
        if (currentProductImages[currentIndex]) {
            lightboxImg.src = currentProductImages[currentIndex].src;
            lightboxImg.alt = currentProductImages[currentIndex].alt;
        }
    }

    // Navegación
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentProductImages.length;
            updateLightboxImage();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentProductImages.length) % currentProductImages.length;
            updateLightboxImage();
        });
    }

    // Cerrar lightbox
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
            if (e.key === 'Escape' && closeBtn) closeBtn.click();
        }
    });

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
}

// Inicializar lightbox
document.addEventListener('DOMContentLoaded', initLightbox);

// Carga diferida para mejorar rendimiento
document.addEventListener("DOMContentLoaded", function () {
    const videoWrappers = document.querySelectorAll('.video-wrapper');

    const lazyLoadVideos = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target.querySelector('iframe');
                iframe.src = iframe.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(lazyLoadVideos, {
        rootMargin: '100px'
    });

    videoWrappers.forEach(wrapper => {
        const iframe = wrapper.querySelector('iframe');
        iframe.dataset.src = iframe.src;
        iframe.src = '';
        observer.observe(wrapper);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.category-item');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    let currentIndex = 0;
    let intervalId;
    const itemWidth = items[0].offsetWidth + 20; // Ancho + gap

    function moveToIndex(index) {
        currentIndex = index;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % (items.length - 2); // -2 para mostrar 3 items
        moveToIndex(currentIndex);
    }

    // Automático cada 5 segundos
    function startCarousel() {
        intervalId = setInterval(nextSlide, 5000);
    }

    // Controles manuales
    nextBtn.addEventListener('click', function () {
        clearInterval(intervalId);
        nextSlide();
        startCarousel();
    });

    prevBtn.addEventListener('click', function () {
        clearInterval(intervalId);
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        moveToIndex(currentIndex);
        startCarousel();
    });

    // Iniciar
    startCarousel();

    // Pausar al interactuar
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', startCarousel);
});


