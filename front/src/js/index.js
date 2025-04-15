import { login, register, changePassword, logout, loginButtons } from './modules/login.js';
import { checkLoginStatus } from './modules/auth.js';
import { showAnimes } from './modules/showAnimes.js';

// Función para inicializar el login
function initAuth() {
    const form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitButton = e.submitter;
            const action = submitButton.dataset.action;

            switch (action) {
                case 'login':
                    login();
                    break;
                case 'register':
                    register();
                    break;
                case 'change-password':
                    changePassword();
                    break;
                default:
                    console.error('Acción no válida:', action);
            }
        });
    }
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loginButtons();
    initAuth();
    logout();
    checkLoginStatus();
    showAnimes();
});