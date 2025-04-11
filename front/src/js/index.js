import { login } from './modules/login.js';
// import { auth } from './modules/auth.js';

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

// Función para inicializar la autenticación
function initAuth() {
    let rhttp = new XMLHttpRequest();

    rhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            if (this.responseText == "!found") {
                console.log(this.responseText);
                console.log("autentificando");
            }
        }
    };

    rhttp.open("GET", "http://localhost:8080/GAM/Auth", true);
    rhttp.send();
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    initAuth();
});