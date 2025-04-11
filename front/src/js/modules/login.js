export function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        var ehttp = new XMLHttpRequest();

        ehttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "found") {
                    window.location.href = "http://localhost:5173/index.html";
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            }
        };

        ehttp.open("POST", "http://localhost:8080/GAM/Auth", true);
        ehttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ehttp.send("username=" + username + "&password=" + password);

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}