export function checkLoginStatus() {
    if (window.location.pathname !== "/pages/login.html") {
        const loggedIn = document.cookie.split('; ').find(row => row.startsWith('loggedIn='))?.split('=')[1];
        if (loggedIn !== "true") {
            window.location.href = "http://localhost:5173/pages/login.html";
        }
    }
}