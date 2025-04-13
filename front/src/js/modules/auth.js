// Manejo de las rutas y del token de autenticación

function checkLoginStatus() {
    if (window.location.pathname !== "/pages/login.html") {
        const token = localStorage.getItem('authToken');
        if (!token) {
            window.location.href = "http://localhost:5173/pages/login.html";
        }
    } else {
        const token = localStorage.getItem('authToken');
        if (token) {
            window.location.href = "http://localhost:5173/index.html";
        }
    }
}

function sendAuthToken() {
    return localStorage.getItem('authToken');
}

export { checkLoginStatus, sendAuthToken };