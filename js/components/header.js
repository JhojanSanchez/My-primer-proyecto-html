/**
 * Header Component
 * Handles the navigation, theme toggle, and login state.
 */

function initHeader() {
    const headerHTML = `
    <header class="header">
        <div class="container"> 
            <div class="header-content">
                <div class="logo">
                     <a href="index.html">
                        <img src="img/LogoSS.png" alt="SkateShop" height="100" width="180" >
                     </a>
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a href="index.html#home">Inicio</a></li>
                        <li><a href="index.html#products">Productos</a></li>
                        <li><a href="index.html#videos">Videos</a></li>
                        <li><a href="index.html#about">Nosotros</a></li>
                        <li><a href="./index_car.html">Tienda</a></li>
                        <li><a href="index.html#contact">Contacto</a></li>
                    </ul>
                </nav>
                <div class="header-actions">
                    <div class="theme-switch-wrapper">
                        <i class="fas fa-sun"></i>
                        <label class="theme-switch" for="checkbox">
                            <input type="checkbox" id="checkbox" />
                            <div class="slider round"></div>
                        </label>
                        <i class="fas fa-moon"></i>
                    </div>
                    <a href="#" class="search-btn"><i class="fas fa-search"></i></a>
                    <a href="login.html" class="user-btn" id="user-menu-btn"><i class="fas fa-user"></i></a>
                    <a href="./carrito.html" class="cart-btn">
                        <i class="fas fa-shopping-cart"></i>
                        <span id="numerito" class="numerito">0</span>
                    </a>
                    <div class="hamburger-menu">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    `;

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
        setupHeaderLogic();
    }
}

function setupHeaderLogic() {
    // Theme Toggle Logic
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    function switchTheme(e) {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }

    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', switchTheme, false);
    }

    // Login State Logic
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

    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbar = document.querySelector('.navbar');
    if (hamburgerMenu && navbar) {
        hamburgerMenu.addEventListener('click', function () {
            this.classList.toggle('active');
            navbar.classList.toggle('active');
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', initHeader);
