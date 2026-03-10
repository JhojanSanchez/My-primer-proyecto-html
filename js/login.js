document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('error-msg');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Autenticación con Supabase
            async function authenticate() {
                try {
                    const { data, error } = await db
                        .from('usuarios')
                        .select('*')
                        .eq('nombre_usuario', username)
                        .eq('contrasena', password)
                        .single();

                    if (data) {
                        // Guardar estado del usuario
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('username', username);

                        // Redirigir al inicio
                        window.location.href = 'index.html';
                    } else {
                        // Mostrar error
                        errorMsg.style.display = 'block';

                        // Animación de error
                        loginForm.style.animation = 'shake 0.5s ease';
                        setTimeout(() => {
                            loginForm.style.animation = '';
                        }, 500);
                    }
                } catch (err) {
                    console.error('Error de conexión:', err);
                    alert('Error al conectar con la base de datos');
                }
            }

            authenticate();
        });
    }
});

// Add shake animation style dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
