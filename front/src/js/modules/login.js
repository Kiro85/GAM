// Función para el inicio de sesión
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        var ehttp = new XMLHttpRequest();

        ehttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (this.responseText == "found") {
                    document.cookie = "loggedIn=true; path=/;";
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

// Función para el registro
function register() {}

// Función para gestionar los botones de inicio de sesión y registro
function loginButtons() {
    let form = document.getElementById('login');
    let loginBtn = document.getElementById('login-btn');
    let registerBtn = document.getElementById('register-btn');
    let loginSend = document.getElementById('login-send');
    let registerSend = document.getElementById('register-send');

    if (form) {
        form.addEventListener('click', (e) => {
            if (e.target === loginBtn) {
                console.log("login btn clicked");
                e.preventDefault();
    
                loginBtn.classList.remove('login__button--login--active');
                registerBtn.classList.remove('login__button--register--active');
                loginSend.classList.remove('login__button--active');
                registerSend.classList.remove('login__button--active');
    
                loginBtn.classList.add('login__button--login--active');
                loginSend.classList.add('login__button--active');
    
            } else if (e.target === registerBtn) {
                console.log("register btn clicked");
                e.preventDefault();
    
                loginBtn.classList.remove('login__button--login--active');
                registerBtn.classList.remove('login__button--register--active');
                loginSend.classList.remove('login__button--active');
                registerSend.classList.remove('login__button--active');
    
                registerBtn.classList.add('login__button--register--active');
                registerSend.classList.add('login__button--active');
            }
        });
    }
}

export { login, register, loginButtons };