import { Backend, Frontend } from '../../config.js';

// Manejo de las rutas y del token de autenticación
function checkLoginStatus() {
    if (window.location.pathname !== "/pages/login.html") {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = `${Frontend}/pages/login.html`;
        }
    } else {
        const token = localStorage.getItem('authToken');
        if (token) {
            window.location.href = `${Frontend}/index.html`;
        }
    }
}

function sendAuthToken() {
    return localStorage.getItem('authToken');
}

export { checkLoginStatus, sendAuthToken };