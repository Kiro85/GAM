import { fetchMangas } from './fetchMangas';
import { fetchMangasGenres } from './fetchMangasGenres';
import { createCard } from '../display/card';
import { debounce, showError, showLoadingState } from './apiControl';

// Variables para mantener el estado
let currentPage = 1;
let currentGenre = '';

// Función para mostrar los mangas
function showMangas({ page = 1, genre = '', search = '' } = {}) {
    const content = document.getElementById('content');

    if (content) {
        // Mostramos el estado de carga
        showLoadingState(content);

        fetchMangas({ page, genre, search })
            .then(data => {
                if (data.data && data.data.length > 0) {
                    content.innerHTML = ''; // Limpiamos el loading
                    data.data.forEach(manga => {
                        let card = createCard('manga', manga);
                        content.appendChild(card);
                    });
                } else {
                    showError(content, '404', { page, genre, search }, showMangas);
                }
            })
            .catch(error => {
                console.error('Error al obtener mangas:', error);
                showError(content, error, { page, genre, search }, showMangas);
            });
    }
}

// Función para mostrar los géneros
function showMangasGenres() {
    const genres = document.getElementById('genres');

    if (genres) {
        // Mostramos el estado de carga
        showLoadingState(genres);

        setTimeout(() => {
            fetchMangasGenres()
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
                        showError(genres, '404', null, showMangasGenres);
                    }
                })
                .catch(error => {
                    console.error('Error al obtener géneros:', error);
                    showError(genres, error, null, showMangasGenres);
                });
        }, 1000);
    }
}

// Funcióna para pasar de paginas
function mangaPages() {
    // Obtenemos los botones
    const pages = document.getElementById('pages');

    if (pages) {
        pages.addEventListener('click', (e) => {
            if (e.target.id === 'prev') {
                if (currentPage > 1) {
                    currentPage--;
                    showMangas({ page: currentPage, genre: currentGenre, search: '' });
                }
            } else if (e.target.id === 'next') {
                currentPage++;
                showMangas({ page: currentPage, genre: currentGenre, search: '' });
            }
        });
    }
}

// Función para filtrar por generos
function filterByMangaGenre(currentCategory) {
    const genre = document.getElementById('genres');

    if (genre && currentCategory === 'mangas') {  // Verificar la categoría actual
        genre.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                currentPage = 1;
                currentGenre = '';
                showMangas({ page: currentPage, genre: currentGenre, search: '' });
                e.target.classList.remove('active');

            } else if (e.target.classList.contains('btn-genres')) {
                const genreId = e.target.getAttribute('data-genre-id');
                currentPage = 1;
                currentGenre = genreId;
                showMangas({ page: currentPage, genre: currentGenre, search: '' });

                genre.querySelectorAll('.btn-genres').forEach(btn => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        });
    }
}

// Función para filtrar por búsqueda
function filterByMangaSearch() {
    const search = document.getElementById('search');
    const content = document.getElementById('content');

    if (search) {
        const debouncedSearch = debounce((searchTerm) => {
            currentPage = 1;
            currentGenre = '';

            // Si el término de búsqueda está vacío, restauramos el estado anterior
            if (!searchTerm || searchTerm.trim() === '') {
                showMangas({ page: 1, genre: currentGenre, search: '' }); // Volvemos a la primera página
            } else {
                // Limpiar selección de género
                document.querySelectorAll('.btn-genres').forEach(btn => {
                    btn.classList.remove('active');
                });
                showMangas({ page: currentPage, genre: currentGenre, search: searchTerm });
            }
        }, 500);

        search.addEventListener('input', (e) => {
            const searchTerm = e.target.value;
            showLoadingState(content);
            debouncedSearch(searchTerm);
        });
    }
}

export { showMangas, showMangasGenres, mangaPages, filterByMangaGenre, filterByMangaSearch };