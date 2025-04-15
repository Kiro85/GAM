import { fetchAnimes } from './fetchAnimes';
import { createAnimeCard } from './card';

export function showAnimes() {
    // Obtenemos el contenido de la página
    const content = document.getElementById('content');

    fetchAnimes()
        .then(data => {
            data.data.forEach(anime => {
                let card = createAnimeCard(anime);
                content.appendChild(card);
                console.log(anime);
            });
        })
        .catch(error => {
            console.error('Error al obtener animes:', error);
        });
}