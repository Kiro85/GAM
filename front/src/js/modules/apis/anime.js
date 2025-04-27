import { fetchAnimes } from './fetchAnimes';
import { fetchAnimesGenres } from './fetchAnimesGenres';
import { createCard } from '../display/card';
import { debounce, showError, showLoadingState } from './apiControl';

// Variables para mantener el estado
let currentPage = 1;
let currentGenre = '';

// Función para mostrar los animes
function showAnimes({ page = 1, genre = '', search = '' } = {}) {
    const content = document.getElementById('content');

    if (content) {
        // Mostramos el estado de carga
        showLoadingState(content);

        fetchAnimes({ page, genre, search })
            .then(data => {
                if (data.data && data.data.length > 0) {
                    content.innerHTML = ''; // Limpiamos el loading
                    data.data.forEach(anime => {
                        let card = createCard('anime', anime);
                        content.appendChild(card);
                    });
                } else {
                    showError(content, '404', { page, genre, search }, showAnimes);
                }
            })
            .catch(error => {
                console.error('Error al obtener animes:', error);
                showError(content, error, { page, genre, search }, showAnimes);
            });
    }
}

// Función para mostrar los géneros
function showAnimesGenres() {
    const genres = document.getElementById('genres');

    if (genres) {
        // Mostramos el estado de carga
        showLoadingState(genres);

        setTimeout(() => {
            fetchAnimesGenres()
                .then(data => {
                    if (data.data && data.data.length > 0) {
                        genres.innerHTML = ''; // Limpiamos el loading
                        data.data.forEach(genre => {
                            let button = document.createElement('button');
                            button.classList.add('btn-genres');
                            button.setAttribute('data-genre-id', genre.mal_id);
                            button.textContent = genre.name;
                            genres.appendChild(button);
                        });
                    } else {
                        showError(genres, '404', null, showAnimesGenres);
                    }
                })
                .catch(error => {
                    console.error('Error al obtener géneros:', error);
                    showError(genres, error, null, showAnimesGenres);
                });
        }, 1000);
    }
}

// Funcióna para pasar de paginas
function animePages() {
    // Obtenemos los botones
    const pages = document.getElementById('pages');

    if (pages) {
        pages.addEventListener('click', (e) => {
            if (e.target.id === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    showAnimes({ page: currentPage, genre: currentGenre, search: '' });
                }
            } else if (e.target.id === 'next') {
                currentPage++;
                showAnimes({ page: currentPage, genre: currentGenre, search: '' });
            }
        });
    }
}

// Función para filtrar por generos
function filterByAnimeGenre(currentCategory) {
    const genre = document.getElementById('genres');

    if (genre && currentCategory === 'animes') {  // Verificar la categoría actual
        genre.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                currentPage = 1;
                currentGenre = '';
                showAnimes({ page: currentPage, genre: currentGenre, search: '' });
                e.target.classList.remove('active');

            } else if (e.target.classList.contains('btn-genres')) {
                const genreId = e.target.getAttribute('data-genre-id');
                currentPage = 1;
                currentGenre = genreId;
                showAnimes({ page: currentPage, genre: currentGenre, search: '' });

                genre.querySelectorAll('.btn-genres').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }
}

// Función para filtrar por búsqueda
function filterByAnimeSearch() {
    const search = document.getElementById('search');
    const content = document.getElementById('content');

    if (search) {
        const debouncedSearch = debounce((searchTerm) => {
            currentPage = 1;
            currentGenre = '';

            // Si el término de búsqueda está vacío, restauramos el estado anterior
            if (!searchTerm || searchTerm.trim() === '') {
                showAnimes({ page: 1, genre: currentGenre, search: '' }); // Volvemos a la primera página
            } else {
                // Limpiar selección de género
                document.querySelectorAll('.btn-genres').forEach(btn => {
                    btn.classList.remove('active');
                });
                showAnimes({ page: currentPage, genre: currentGenre, search: searchTerm });
            }
        }, 500);

        search.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            showLoadingState(content);
            debouncedSearch(searchTerm);
        });
    }
}

export { showAnimes, showAnimesGenres, animePages, filterByAnimeGenre, filterByAnimeSearch };