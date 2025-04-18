import { login, register, changePassword, logout, loginButtons } from './modules/login.js';
import { checkLoginStatus } from './modules/auth.js';
import { showAnimes, showGenres, pages } from './modules/anime.js';

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
    // login
    loginButtons();
    initAuth();
    logout();
    checkLoginStatus();
    
    // animes
    showAnimes();
    // Esperamos 1 segundo para mostrar los géneros por que la api tiene un rate limit
    setTimeout(() => {
        showGenres();
    }, 1000);
    pages();
});