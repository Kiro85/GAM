function removeFriendFromDB(friendId) {
    return new Promise((resolve, reject) => {
        try {
            const http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            const response = JSON.parse(this.responseText);
                            if (response.error) {
                                reject(new Error(response.error));
                            } else if (response.success) {
                                resolve(true);
                            } else {
                                reject(new Error('Respuesta inválida del servidor'));
                            }
                        } catch (e) {
                            console.error('Respuesta del servidor:', this.responseText);
                            reject(new Error('Error al procesar la respuesta: ' + e.message));
                        }
                    } else {
                        reject(new Error('Error al eliminar amigo: ' + this.status));
                    }
                }
            };

            http.open("POST", "http://localhost:8080/GAM/RemoveFriend", true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.send("userToken=" + localStorage.getItem('authToken') + "&friendId=" + friendId);

        } catch (error) {
            reject(error);
        }
    });
}

function handleRemoveFriendButton(button, friendId) {
    if (button.disabled) return;

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Eliminando...';

    removeFriendFromDB(friendId)
        .then(() => {
            // Eliminar la tarjeta del amigo del DOM
            const friendCard = button.closest('.friend-card');
            if (friendCard) {
                friendCard.remove();
            }

            // Verificar si quedan amigos
            const friendsContainer = document.getElementById('friends-container');
            if (friendsContainer && friendsContainer.children.length === 0) {
                friendsContainer.innerHTML = '<p class="no-friends">No tienes amigos agregados</p>';
            }
        })
        .catch(error => {
            console.error('Error al eliminar amigo:', error);
            alert('Error al eliminar amigo: ' + error.message);
            button.disabled = false;
            button.textContent = originalText;
        });
}

export { handleRemoveFriendButton }; 