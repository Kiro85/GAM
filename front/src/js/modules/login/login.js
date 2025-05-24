import { Backend, Frontend } from '../../config.js';

// Función para el inicio de sesión
function login() {
    let username = document.querySelector('[data-action="login-username"]').value;
    let password = document.querySelector('[data-action="login-password"]').value;

    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                let token = http.responseText; // recibimos el token del bakend

                if (this.responseText != "!found") {
                    localStorage.setItem('authToken', token); // lo guardamos en el localStorage
                    localStorage.setItem('username', username); // guardamos el nombre de usuario
                    console.log('Inicio de sesión exitoso. Token guardado:', token);
                    window.location.href = `${Frontend}/index.html`;
                } else {
                    alert("Usuario o contraseña incorrectos");
                }
            }
        };

        http.open("POST", `${Backend}/Login`, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&password=" + password);

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
    }
}

// Función para el registro
function register() {
    let username = document.querySelector('[data-action="register-username"]').value;
    let password = document.querySelector('[data-action="register-password"]').value;
    let repeatPassword = document.querySelector('[data-action="register-repeat-password"]').value;

    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                window.location.reload();
            }
        };

        http.open("POST", `${API_URL}/Register`, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&password=" + password + "&repeatPassword=" + repeatPassword);

    } catch (error) {
        console.error('Error al registrar:', error);
    }
}

// Función para el cambio de contraseña
function changePassword() {
    let username = document.querySelector('[data-action="change-username"]').value;
    let oldPassword = document.querySelector('[data-action="change-old-password"]').value;
    let newPassword = document.querySelector('[data-action="change-new-password"]').value;
    let confirmPassword = document.querySelector('[data-action="change-confirm-password"]').value;

    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                window.location.reload();
            }
        };

        http.open("POST", `${Backend}/ChangePassword`, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        http.send("username=" + username + "&oldPassword=" + oldPassword + "&newPassword=" + newPassword + "&confirmPassword=" + confirmPassword);

    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
    }
}

// Función para el logout
function logout() {
    let logoutBtn = document.getElementById('logoutButton');

    try {
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('authToken');
                localStorage.removeItem('username'); // Eliminamos el nombre de usuario
                window.location.href = `${Frontend}/pages/login.html`;
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

    // Función para manejar los campos required
    function handleRequiredFields(formType) {
        // Quitar required de todos los campos
        document.querySelectorAll('input[required]').forEach(input => {
            input.removeAttribute('required');
        });

        // Agregar required a los campos del formulario activo
        if (formType === 'login') {
            document.querySelector('[data-action="login-username"]').setAttribute('required', '');
            document.querySelector('[data-action="login-password"]').setAttribute('required', '');
        } else if (formType === 'register') {
            document.querySelector('[data-action="register-username"]').setAttribute('required', '');
            document.querySelector('[data-action="register-password"]').setAttribute('required', '');
            document.querySelector('[data-action="register-repeat-password"]').setAttribute('required', '');
        } else if (formType === 'change-password') {
            document.querySelector('[data-action="change-username"]').setAttribute('required', '');
            document.querySelector('[data-action="change-old-password"]').setAttribute('required', '');
            document.querySelector('[data-action="change-new-password"]').setAttribute('required', '');
            document.querySelector('[data-action="change-confirm-password"]').setAttribute('required', '');
        }
    }

    // Función para manejar el clic en los botones
    function handleButtonClick(button, form, formType) {
        deactivateAllButtons();
        hideAllForms();
        button.classList.add('login__button--option--active');
        form.style.display = 'flex';
        handleRequiredFields(formType);
    }

    // Event listeners para los botones
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            handleButtonClick(loginBtn, loginForm, 'login');
        });
    }

    if (registerBtn) {
        registerBtn.addEventListener('click', () => {
            handleButtonClick(registerBtn, registerForm, 'register');
        });
    }

    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            handleButtonClick(changePasswordBtn, changePasswordForm, 'change-password');
        });
    }

    // Mostrar el formulario de login por defecto
    if (loginForm) {
        loginForm.style.display = 'flex';
        handleRequiredFields('login');
    }
}

export { login, register, changePassword, logout, loginButtons };