// Función para el inicio de sesión
function login() {
    let username = document.querySelector('[data-action="login-username"]').value;
    let password = document.querySelector('[data-action="login-password"]').value;

    try {
        var ehttp = new XMLHttpRequest();

        ehttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let token = ehttp.responseText; // recibimos el token del bakend

                if (this.responseText != "!found") {
                    localStorage.setItem('authToken', token); // lo guardamos en el localStorage
                    console.log('Inicio de sesión exitoso. Token guardado:', token);
                    window.location.href = "http://localhost:5173/index.html";
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            }
        };

        ehttp.open("POST", "http://localhost:8080/GAM/Login", true);
        ehttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ehttp.send("username=" + username + "&password=" + password);

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

// Función para el registro
function register() { }

// Función para el cambio de contraseña
function changePassword() { 
    let username = document.querySelector('[data-action="change-username"]').value;
    let oldPassword = document.querySelector('[data-action="change-old-password"]').value;
    let newPassword = document.querySelector('[data-action="change-new-password"]').value;
    let confirmPassword = document.querySelector('[data-action="change-confirm-password"]').value;

    try {
        var ehttp = new XMLHttpRequest();

        ehttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let token = ehttp.responseText; // recibimos el token del bakend

                if (this.responseText != "!found") {
                    localStorage.setItem('authToken', token); // lo guardamos en el localStorage
                    console.log('Inicio de sesión exitoso. Token guardado:', token);
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

// Función para el logout
function logout() {
    let logoutBtn = document.getElementById('logoutButton');

    try {
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('authToken');
                window.location.href = "http://localhost:5173/pages/login.html";
            });
        }
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
}

// Función para gestionar los botones de inicio de sesión y registro
function loginButtons() {
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');
    const changePasswordBtn = document.getElementById('change-password-btn');
    const loginForm = document.querySelector('[data-form="login"]');
    const registerForm = document.querySelector('[data-form="register"]');
    const changePasswordForm = document.querySelector('[data-form="change-password"]');

    // Función para ocultar todos los formularios
    function hideAllForms() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        changePasswordForm.style.display = 'none';
    }

    // Función para desactivar todos los botones
    function deactivateAllButtons() {
        loginBtn.classList.remove('login__button--option--active');
        registerBtn.classList.remove('login__button--option--active');
        changePasswordBtn.classList.remove('login__button--option--active');
    }

    // Función para manejar el clic en los botones
    function handleButtonClick(button, form) {
        deactivateAllButtons();
        hideAllForms();
        button.classList.add('login__button--option--active');
        form.style.display = 'flex';
    }

    // Event listeners para los botones
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            handleButtonClick(loginBtn, loginForm);
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            handleButtonClick(registerBtn, registerForm);
        });
    }

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            handleButtonClick(changePasswordBtn, changePasswordForm);
        });
    }

    // Mostrar el formulario de login por defecto
    if (loginForm) {
        loginForm.style.display = 'flex';
    }
}

export { login, register, changePassword, logout, loginButtons };