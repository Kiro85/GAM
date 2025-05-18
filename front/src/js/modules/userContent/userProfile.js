import { getSavedAnimes, getSavedMangas } from './getUserContent.js';
import { createUserProfile, initUserProfile } from '../display/userProfileModal.js';
import { getFriendAnimes } from '../apis/anime.js';
import { getFriendMangas } from '../apis/mangas.js';

export async function showUserProfile(userId, username) {
    // Obtener el contenedor donde se mostrará el perfil
    const container = document.getElementById('friends-container');

    if (container) {
        try {
            // Esperamos a que se resuelvan las promesas
            const [animes, mangas] = await Promise.all([
                getSavedAnimes(userId),
                getSavedMangas(userId)
            ]);

            const user = {
                userId: userId,
                username: username,
                animes: [],
                mangas: []
            };

            // Obtener los datos completos de la API para animes y mangas
            const [animeData, mangaData] = await Promise.all([
                getFriendAnimes(animes),
                getFriendMangas(mangas)
            ]);

            user.animes = animeData;
            user.mangas = mangaData;

            container.innerHTML = createUserProfile(user);
            initUserProfile();
        } catch (error) {
            console.error('Error al cargar el perfil:', error);
            container.innerHTML = `
                <div class="error-message">
                    <p>Error al cargar el perfil</p>
                    <p>Por favor, inténtalo de nuevo más tarde</p>
                </div>`;
        }
    }
}