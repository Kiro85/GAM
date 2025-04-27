import { login, register, changePassword, logout, loginButtons } from './login.js';


// Función para inicializar el login
export function initAuth() {
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