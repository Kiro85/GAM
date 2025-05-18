import { fetchUsers } from './fetchUsers.js';
import { debounce } from '../apis/apiControl.js';
import { handleAddFriendButton } from './addFriends.js';

export function initUserSearch() {
    const searchInput = document.querySelector('.search__input');
    const friendsContainer = document.getElementById('friends-container');

    if (searchInput && friendsContainer) {
        const debouncedSearch = debounce(async (searchTerm) => {
            try {
                const response = await fetchUsers(searchTerm);
                const users = JSON.parse(response);
                displaySearchResults(users, friendsContainer);
            } catch (error) {
                console.error('Error searching users:', error);
                friendsContainer.innerHTML = `
                    <div class="error-message">
                        <p>Error al buscar usuarios</p>
                        <p>Por favor, inténtalo de nuevo más tarde</p>
                    </div>`;
            }
        }, 500);

        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.trim();
            if (searchTerm) {
                debouncedSearch(searchTerm);
            }
        });
    }
}

function displaySearchResults(users, container) {
    if (!users || users.length === 0) {
        container.innerHTML = `
            <div class="error-message">
                <p>No se encontraron usuarios</p>
            </div>`;
        return;
    }

    // Convertimos el array de usernames en objetos de usuario
    const userObjects = users.map(username => ({
        username: username,
    }));

    container.innerHTML = userObjects.map(user => `
        <article class="friend-card">
            <img class="friend-card__avatar" src="${user.avatar || 'https://i.pinimg.com/736x/73/a6/71/73a671ed0f6a83009fbd75bec75620b7.jpg'}" alt="Avatar">
            <section class="friend-card__info">
                <h3 class="friend-card__name">${user.username}</h3>
                <section class="friend-card__actions">
                    <button class="friend-card__btn friend-card__btn--add" title="Agregar amigo" data-username="${user.username}">
                        <i class="bi bi-person-plus"></i>
                    </button>
                </section>
            </section>
        </article>
    `).join('');

    // Añadir evento de click a los botones de agregar amigo
    container.querySelectorAll('.friend-card__btn--add').forEach(button => {
        handleAddFriendButton(button);
    });
} 