import { handleRemoveFriendButton } from '../userContent/removeFriend.js';
import { showUserProfile } from '../userContent/userProfile.js';

export function createFriendCard(userId, username) {
    // Creamos el elemento de la card
    const card = document.createElement('article');
    card.classList.add('friend-card');
    card.dataset.userId = userId; // Añadimos el ID como atributo de datos

    const template = `
        <img class="friend-card__avatar"
            src="http://localhost:8080/GAM/GetProfileImage?username=${username}&imageType=avatar_image&t=${new Date().getTime()}" 
            alt="Avatar">
        <section class="friend-card__info">
            <h3 class="friend-card__name">${username}</h3>
            <section class="friend-card__actions">
                <button class="friend-card__btn friend-card__btn--remove" data-friend-id="${userId}" title="Eliminar amigo">
                    <i class="bi bi-person-x"></i>
                </button>
            </section>
        </section>
    `;

    // Insertamos el template en la card
    card.innerHTML = template;

    // Agregamos el evento de clic para mostrar el perfil del usuario
    card.addEventListener("click", (e) => {
        // Evitamos que el clic se propague a los botones
        if (!e.target.closest('.friend-card__btn')) {
            showUserProfile(userId, username);
        }
    });

    // Añadir el evento al botón de eliminar
    const removeButton = card.querySelector('.friend-card__btn--remove');
    removeButton.addEventListener('click', () => {
        const friendId = removeButton.dataset.friendId;
        if (confirm(`¿Estás seguro de que quieres eliminar a ${username} de tus amigos?`)) {
            handleRemoveFriendButton(removeButton, friendId);
        }
    });

    // Devolvemos la card
    return card;
}