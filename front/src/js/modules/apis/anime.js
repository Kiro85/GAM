import { fetchAnimes } from './fetchAnimes';
import { fetchAnimesGenres } from './fetchAnimesGenres';
import { createCard } from '../display/card';
import { createTop } from '../display/tops';
import { debounce, showError, showLoadingState } from './apiControl';
import { resetSelectorToCatalog } from './initContent';
import { getSavedAnimes } from '../userContent/getUserContent';
import { getAnimePosition } from '../userContent/getUserContent';

// Variables para mantener el estado
let currentPage = 1;
let currentGenre = '';

// Función para mostrar los animes
function showAnimes({ page = 1, genre = '', search = '', id = '' } = {}) {
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

// Función para mostrar los animes en tops
function showAnimesTops() {
    const content = document.getElementById('content');

    if (content) {
        // Mostramos el estado de carga
        showLoadingState(content);

        fetchAnimes({ limit: 10 })
            .then(data => {
                if (data.data && data.data.length > 0) {
                    content.innerHTML = ''; // Limpiamos el loading
                    data.data.forEach((anime, i) => {
                        let top = createTop('anime', anime);
                        content.appendChild(top);
                    });
                } else {
                    showError(content, '404', null, showAnimesTops);
                }
            })
            .catch(error => {
                console.error('Error al obtener animes:', error);
                showError(content, error, null, showAnimesTops);
            });
    }
}

// Función para mostrar los tops del usuario
async function showUserAnimeTops() {
    const content = document.getElementById('savedContent');

    if (content) {
        showLoadingState(content);

        try {
            const savedContent = await getSavedAnimes();
            if (savedContent) {
                content.innerHTML = '';

                // Convertimos la cadena de IDs en un array y filtramos valores vacíos
                const animeIds = savedContent.split(',').filter(id => id.trim());
                const loadedAnimes = [];

                // Cargamos todos los animes primero
                for (const animeId of animeIds) {
                    try {
                        const response = await fetchAnimes({ id: animeId.trim() });
                        if (response.data) {
                            // Obtenemos la posición del anime en la base de datos
                            const position = await getAnimePosition(animeId.trim());
                            response.data.position = position;
                            loadedAnimes.push(response.data);
                        }
                        await new Promise(resolve => setTimeout(resolve, 1500));
                    } catch (error) {
                        console.error(`Error al obtener anime ${animeId}:`, error);
                        continue;
                    }
                }

                // Ordenamos por posición, poniendo los que no tienen posición (0) al final
                loadedAnimes
                    .sort((a, b) => {
                        // Si alguno tiene posición 0, lo ponemos al final
                        if (a.position === 0) return 1;
                        if (b.position === 0) return -1;
                        // Si ambos tienen posición, ordenamos por posición
                        return a.position - b.position;
                    })
                    .slice(0, 10)
                    .forEach((anime) => {
                        anime.rank = anime.position || 0; // Usamos la posición guardada o 0 si no tiene
                        let top = createTop('anime', anime);
                        content.appendChild(top);
                    });
            }
        } catch (error) {
            console.error('Error al mostrar tops de anime:', error);
            showError(content, error, null, showUserAnimeTops);
        }
    }
}

// Función para mostrar el contenido guardado
async function showSavedAnimes() {
    const content = document.getElementById('savedContent');

    if (content) {
        // Mostramos el estado de carga
        showLoadingState(content);

        try {
            // Obtenemos el contenido guardado
            const savedContent = await getSavedAnimes();

            if (savedContent) {
                // Convertimos la cadena en un array de objetos con id y rating
                const contentItems = savedContent.split('\n')
                    .filter(line => line.trim())
                    .map(line => {
                        const match = line.match(/Content: (\d+) Rating: ([\d.]+)/);
                        if (match) {
                            return {
                                id: match[1],
                                rating: parseFloat(match[2])
                            };
                        }
                        return null;
                    })
                    .filter(item => item !== null);

                // Array para almacenar todos los animes cargados
                const loadedAnimes = [];

                // Cargamos todos los animes primero
                for (const item of contentItems) {
                    try {
                        const response = await fetchAnimes({ id: item.id });
                        if (response.data) {
                            response.data.rating = item.rating;
                            loadedAnimes.push(response.data);
                        }

                        // Esperamos 1.5 segundos entre cada petición
                        await new Promise(resolve => setTimeout(resolve, 1500));

                    } catch (error) {
                        console.error(`Error al obtener anime ${item.id}:`, error);
                        // Continuamos con el siguiente anime si hay error
                        continue;
                    }
                }

                // Una vez cargados todos, limpiamos el contenido y mostramos las tarjetas
                content.innerHTML = '';

                loadedAnimes.forEach(anime => {
                    let card = createCard('anime', anime, true);
                    content.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error al mostrar animes guardados:', error);
            showError(content, error, null, showSavedAnimes);
        }
    }
}

// Función para obtener los animes guardados de un usuario
async function getFriendAnimes(animes) {
    try {
        if (!animes) return [];

        let animeItems;

        if (Array.isArray(animes)) {
            animeItems = animes.map(id => ({ id, rating: 0 }));
        } else {
            const strAnimes = String(animes);
            animeItems = strAnimes.split('\n')
                .map(line => {
                    const match = line.match(/Content: (\d+) Rating: ([\d.]+)/);
                    return match ? {
                        id: match[1],
                        rating: parseFloat(match[2])
                    } : null;
                })
                .filter(item => item !== null);
        }

        const loadedAnimes = [];

        for (const item of animeItems) {
            try {
                const response = await fetchAnimes({ id: item.id.trim() });
                if (response.data) {
                    response.data.rating = item.rating;
                    loadedAnimes.push(response.data);
                }
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
                continue;
            }
        }

        return loadedAnimes;
    } catch (error) {
        return [];
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
                resetSelectorToCatalog();
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
                resetSelectorToCatalog();
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

export { showAnimes, showAnimesTops, showSavedAnimes, showAnimesGenres, animePages, filterByAnimeGenre, filterByAnimeSearch, showUserAnimeTops, getFriendAnimes };