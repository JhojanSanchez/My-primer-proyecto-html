document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    hamburgerMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    const animateOnScroll = function() {
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
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = "none";
});
    
    // Cart functionality
    const cartBtn = document.querySelector('.cart-btn');
    let cartCount = 0;
    
    document.querySelectorAll('.product-item .btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            updateCartCount();
            
            // Add animation
            const product = this.closest('.product-item');
            const productClone = product.cloneNode(true);
            productClone.style.position = 'fixed';
            productClone.style.width = product.offsetWidth + 'px';
            productClone.style.height = product.offsetHeight + 'px';
            productClone.style.top = product.getBoundingClientRect().top + 'px';
            productClone.style.left = product.getBoundingClientRect().left + 'px';
            productClone.style.zIndex = '1000';
            productClone.style.transition = 'all 0.5s ease';
            productClone.style.pointerEvents = 'none';
            
            document.body.appendChild(productClone);
            
            setTimeout(() => {
                productClone.style.width = '50px';
                productClone.style.height = '50px';
                productClone.style.top = (cartBtn.getBoundingClientRect().top + 10) + 'px';
                productClone.style.left = (cartBtn.getBoundingClientRect().left + 10) + 'px';
                productClone.style.opacity = '0.5';
            }, 10);
            
            setTimeout(() => {
                productClone.remove();
            }, 600);
        });
    });
    
    function updateCartCount() {
        if (cartCount > 0) {
            if (!document.querySelector('.cart-count')) {
                const countElement = document.createElement('span');
                countElement.className = 'cart-count';
                countElement.textContent = cartCount;
                cartBtn.appendChild(countElement);
            } else {
                document.querySelector('.cart-count').textContent = cartCount;
            }
        } else if (document.querySelector('.cart-count')) {
            document.querySelector('.cart-count').remove();
        }
    }
    
    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', function(e) {
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
        closeBtn.addEventListener('click', function() {
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
});

// JavaScript - Control manual + automático
document.querySelectorAll('.product-carousel').forEach(carousel => {
    const images = carousel.querySelectorAll('img');
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
    nextBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        nextImage();
        startCarousel();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        prevImage();
        startCarousel();
    });

    // Iniciar
    startCarousel();

    // Pausa al interactuar
    carousel.addEventListener('mouseenter', () => clearInterval(intervalId));
    carousel.addEventListener('mouseleave', startCarousel);
});

// Lightbox para productos
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    let currentProductImages = [];
    let currentIndex = 0;

    // Abrir lightbox al hacer clic en imágenes de productos
    document.querySelectorAll('.product-carousel img, .product-item img').forEach(img => {
        img.addEventListener('click', function() {
            const productContainer = this.closest('.product-item');
            currentProductImages = Array.from(productContainer.querySelectorAll('img')).map(img => ({
                src: img.src,
                alt: img.alt
            }));
            currentIndex = currentProductImages.findIndex(item => item.src === this.src);
            
            lightbox.style.display = 'flex';
            updateLightboxImage();
        });
    });

    // Actualizar imagen del lightbox
    function updateLightboxImage() {
        lightboxImg.src = currentProductImages[currentIndex].src;
        lightboxImg.alt = currentProductImages[currentIndex].alt;
    }

    // Navegación
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentProductImages.length;
        updateLightboxImage();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentProductImages.length) % currentProductImages.length;
        updateLightboxImage();
    });

    // Cerrar lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
        if (lightbox.style.display === 'flex') {
            if (e.key === 'ArrowRight') nextBtn.click();
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'Escape') closeBtn.click();
        }
    });

    // Cerrar al hacer clic fuera de la imagen
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
        }
    });
});

// Carga diferida para mejorar rendimiento
document.addEventListener("DOMContentLoaded", function() {
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

document.addEventListener('DOMContentLoaded', function() {
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
    nextBtn.addEventListener('click', function() {
        clearInterval(intervalId);
        nextSlide();
        startCarousel();
    });

    prevBtn.addEventListener('click', function() {
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

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Verificar si hay una preferencia guardada en localStorage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun'); // Cambia a sol si está en modo oscuro
    }

    // Alternar tema al hacer clic
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            localStorage.setItem('theme', 'light');
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });
});

