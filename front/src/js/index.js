import { login, register, loginButtons } from './modules/login.js';
import { checkLoginStatus } from './modules/auth.js';


// Función para inicializar el login
function initAuth() {
    let form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'register') {
                e.preventDefault();
                register();
                
            } else if (e.target.dataset.action === 'login') {
                e.preventDefault();
                login();
            }
        });
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loginButtons();
    initAuth();
    checkLoginStatus();
});