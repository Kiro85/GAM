import { createFriendCard } from '../display/friendCard.js';

function getFriendsFromDB() {
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
                            } else if (Array.isArray(response)) {
                                resolve(response);
                            } else {
                                reject(new Error('Formato de respuesta inválido'));
                            }
                        } catch (e) {
                            console.error('Respuesta del servidor:', this.responseText);
                            reject(new Error('Error al procesar la respuesta: ' + e.message));
                        }
                    } else {
                        reject(new Error('Error al obtener los amigos: ' + this.status));
                    }
                }
            };

            http.open("POST", "http://localhost:8080/GAM/GetFriends", true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.send("userToken=" + localStorage.getItem('authToken'));

        } catch (error) {
            reject(error);
        }
    });
}

async function getFriends() {
    const friendsContainer = document.getElementById('friends-container');
    if (!friendsContainer) {
        console.error('No se encontró el contenedor de amigos');
        return;
    }

    try {
        // Limpiar el contenedor antes de cargar nuevos amigos
        friendsContainer.innerHTML = '';

        const friends = await getFriendsFromDB();

        if (Array.isArray(friends) && friends.length > 0) {
            friends.forEach(friend => {
                if (friend && friend.id && friend.username) {
                    const friendCard = createFriendCard(friend.id, friend.username);
                    friendsContainer.appendChild(friendCard);
                }
            });
        } else {
            friendsContainer.innerHTML = '<p class="no-friends">No tienes amigos agregados</p>';
        }
    } catch (error) {
        console.error('Error al mostrar amigos:', error);
        friendsContainer.innerHTML = `<p class="error-message">Error al cargar amigos: ${error.message}</p>`;
    }
}

export { getFriends };