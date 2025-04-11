import { login } from './modules/login.js';
import { checkLoginStatus } from './modules/auth.js';

// Función para inicializar el login
function initLogin() {
    let form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            login();
        });
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    checkLoginStatus();
});