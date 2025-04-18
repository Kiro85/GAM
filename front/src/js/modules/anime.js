import { fetchAnimes } from './fetchAnimes';
import { fetchAnimesGenres } from './fetchAnimesGenres';
import { createAnimeCard } from './card';

// Variable global para la página actual
let currentPage = 1;

// Función para mostrar los animes  
function showAnimes({ page = 1, genre = '', search = '' } = {}) {
    // Obtenemos el contenido de la página
    const content = document.getElementById('content');

    // Limpiamos el contenido anterior
    content.innerHTML = '';

    // mostramos los animes
    if (content) {
        fetchAnimes({ page: page, genre: genre, search: search })
        .then(data => {
            data.data.forEach(anime => {
                let card = createAnimeCard(anime);
                content.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error al obtener animes:', error);
        });
    }
}

// Función para mostrar los géneros
function showGenres() {
    // Obtenemos los géneros
    const genres = document.getElementById('genres');

    if (genres) {
        fetchAnimesGenres()
        .then(data => {
            data.data.forEach(genre => {
                let button = document.createElement('button');
                button.classList.add('btn-genres');
                button.textContent = genre.name;
                genres.appendChild(button);
            });
        });
    }
}

// Funcióna para pasar de paginas
function pages() {
    // Obtenemos los botones
    const pages = document.getElementById('pages');

    if (pages) {
        pages.addEventListener('click', (e) => {
            if (e.target.id === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    showAnimes({ page: currentPage, genre: '', search: '' });
                }
            } else if (e.target.id === 'next') {
                currentPage++;
                showAnimes({ page: currentPage, genre: '', search: '' });
            }
        });
    }
}

export { showAnimes, showGenres, pages };