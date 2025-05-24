import { Backend } from '../../config.js';

// Función para agregar un amigo
function addFriend(friendUsername, button) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    // Éxito
                    alert(this.responseText);
                    button.disabled = true;
                    button.classList.add('friend-card__btn--added');
                    button.innerHTML = '<i class="bi bi-check"></i>';
                } else {
                    // Error
                    alert(this.responseText);
                    button.disabled = false;
                    button.classList.remove('friend-card__btn--added');
                    button.innerHTML = '<i class="bi bi-person-plus"></i>';
                }
            }
        };

        http.open("POST", `${Backend}/AddFriend`, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("userToken=" + localStorage.getItem('authToken') + "&friendUsername=" + friendUsername);

    } catch (error) {
        console.error('Error al agregar amigo:', error);
        alert('Error al agregar amigo. Por favor, inténtalo de nuevo.');
        button.disabled = false;
        button.classList.remove('friend-card__btn--added');
        button.innerHTML = '<i class="bi bi-person-plus"></i>';
    }
}

// Función para manejar el botón de agregar amigo
function handleAddFriendButton(button) {
    button.addEventListener('click', () => {
        const username = button.dataset.username;
        // Deshabilitar temporalmente el botón mientras se procesa la petición
        button.disabled = true;
        button.classList.add('friend-card__btn--loading');
        button.innerHTML = '<i class="bi bi-hourglass-split"></i>';
        addFriend(username, button);
    });
}

export { handleAddFriendButton};
