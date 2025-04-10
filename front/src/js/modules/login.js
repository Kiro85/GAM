document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    // // Verificar si hay error en la URL
    // const urlParams = new URLSearchParams(window.location.search);
    // if (urlParams.get('error') === 'true') {
    //     alert('Usuario o contraseña incorrectos');
    // }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                
                var ehttp = new XMLHttpRequest();
            
                ehttp.open("POST", "http://localhost:8080/GAM/Auth", true);
                ehttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ehttp.send("username="+username+"password="+password);

            } catch (error) {
                console.error('Error al iniciar sesión:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }
}); 