import { logout, loginButtons } from './modules/login/login.js';
import { initAuth } from './modules/login/initAuth.js';
import { checkLoginStatus } from './modules/login/auth.js';
import { initContent } from './modules/apis/initContent.js';
import { showAnimes, showMangas } from './userContent/getUserContent.js';
import { addToCollection } from './userContent/addUserContent.js';

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loginButtons();
    initAuth();
    logout();
    checkLoginStatus();
    initContent();
    showAnimes();
    showMangas();
    addToCollection();
});
