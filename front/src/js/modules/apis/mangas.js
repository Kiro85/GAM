import { fetchMangas } from './fetchMangas';
import { fetchMangasGenres } from './fetchMangasGenres';
import { createCard } from '../display/card';
import { createTop } from '../display/tops';
import { debounce, showError, showLoadingState } from './apiControl';
import { resetSelectorToCatalog } from './initContent';
import { getSavedMangas } from '../userContent/getUserContent';
import { getMangaPosition } from '../userContent/getUserContent';

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

// Función para mostrar los mangas en tops
function showMangasTops() {
    const content = document.getElementById('content');

    if (content) {
        // Mostramos el estado de carga
        showLoadingState(content);

        fetchMangas({ limit: 10 })
            .then(data => {
                if (data.data && data.data.length > 0) {
                    content.innerHTML = ''; // Limpiamos el loading
                    data.data.forEach((manga, i) => {
                        let top = createTop('manga', manga);
                        content.appendChild(top);
                    });
                } else {
                    showError(content, '404', null, showMangasTops);
                }
            })
            .catch(error => {
                console.error('Error al obtener mangas:', error);
                showError(content, error, null, showMangasTops);
            });
    }
}

// Función para mostrar los tops del usuario
async function showUserMangaTops() {
    const content = document.getElementById('savedContent');

    if (content) {
        showLoadingState(content);

        try {
            const savedContent = await getSavedMangas();
            if (savedContent) {
                content.innerHTML = '';

                // Convertimos la cadena de IDs en un array y filtramos valores vacíos
                const mangaIds = savedContent.split(',').filter(id => id.trim());
                const loadedMangas = [];

                // Cargamos todos los mangas primero
                for (const mangaId of mangaIds) {
                    try {
                        const response = await fetchMangas({ id: mangaId.trim() });
                        if (response.data) {
                            // Obtenemos la posición del manga en la base de datos
                            const position = await getMangaPosition(mangaId.trim());
                            response.data.position = position;
                            loadedMangas.push(response.data);
                        }
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } catch (error) {
                        console.error(`Error al obtener manga ${mangaId}:`, error);
                        continue;
                    }
                }

                // Ordenamos por posición, poniendo los que no tienen posición (0) al final
                loadedMangas
                    .sort((a, b) => {
                        // Si alguno tiene posición 0, lo ponemos al final
                        if (a.position === 0) return 1;
                        if (b.position === 0) return -1;
                        // Si ambos tienen posición, ordenamos por posición
                        return a.position - b.position;
                    })
                    .slice(0, 10)
                    .forEach((manga) => {
                        manga.rank = manga.position || 0; // Usamos la posición guardada o 0 si no tiene
                        let top = createTop('manga', manga);
                        content.appendChild(top);
                    });
            }
        } catch (error) {
            console.error('Error al mostrar tops de manga:', error);
            showError(content, error, null, showUserMangaTops);
        }
    }
}

// Función para mostrar el contenido guardado
async function showSavedMangas() {
    const content = document.getElementById('savedContent');

    if (content) {
        // Mostramos el estado de carga
        showLoadingState(content);

        try {
            // Obtenemos el contenido guardado
            const savedContent = await getSavedMangas();

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

                // Array para almacenar todos los mangas cargados
                const loadedMangas = [];

                // Cargamos todos los mangas primero
                for (const item of contentItems) {
                    try {
                        const response = await fetchMangas({ id: item.id });
                        if (response.data) {
                            response.data.rating = item.rating;
                            loadedMangas.push(response.data);
                        }

                        // Esperamos 1.5 segundos entre cada petición
                        await new Promise(resolve => setTimeout(resolve, 1500));

                    } catch (error) {
                        console.error(`Error al obtener manga ${item.id}:`, error);
                        // Continuamos con el siguiente manga si hay error
                        continue;
                    }
                }

                // Una vez cargados todos, limpiamos el contenido y mostramos las tarjetas
                content.innerHTML = '';

                loadedMangas.forEach(manga => {
                    let card = createCard('manga', manga, true);
                    content.appendChild(card);
                });
            }
        } catch (error) {
            console.error('Error al mostrar mangas guardados:', error);
            showError(content, error, null, showSavedMangas);
        }
    }
}

// Función para obtener los mangas guardados de un usuario
async function getFriendMangas(mangas) {
    try {
        if (!mangas) return [];

        let mangaItems;

        if (Array.isArray(mangas)) {
            mangaItems = mangas.map(id => ({ id, rating: 0 }));
        } else {
            const strMangas = String(mangas);
            mangaItems = strMangas.split('\n')
                .map(line => {
                    const match = line.match(/Content: (\d+) Rating: ([\d.]+)/);
                    return match ? {
                        id: match[1],
                        rating: parseFloat(match[2])
                    } : null;
                })
                .filter(item => item !== null);
        }

        const loadedMangas = [];

        for (const item of mangaItems) {
            try {
                const response = await fetchMangas({ id: item.id.trim() });
                if (response.data) {
                    response.data.rating = item.rating;
                    loadedMangas.push(response.data);
                }
                await new Promise(resolve => setTimeout(resolve, 1500));
            } catch (error) {
                continue;
            }
        }

        return loadedMangas;
    } catch (error) {
        return [];
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
                resetSelectorToCatalog();
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
                resetSelectorToCatalog();
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

export { showMangas, showMangasTops, showSavedMangas, showMangasGenres, mangaPages, filterByMangaGenre, filterByMangaSearch, showUserMangaTops, getFriendMangas };