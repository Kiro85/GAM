import { showAnimes, showAnimesGenres, animePages, filterByAnimeGenre, filterByAnimeSearch } from './anime.js';
import { showMangas, showMangasGenres, mangaPages, filterByMangaGenre, filterByMangaSearch } from './mangas.js';
// import { showGames } from './games.js';

let currentCategory = 'mangas'; // Para mantener un registro de la categoría 

// Función para limpiar los event listeners
function removeEventListeners() {
    const search = document.getElementById('search');
    const pages = document.getElementById('pages');
    const genres = document.getElementById('genres');

    if (search) {
        const newSearch = search.cloneNode(true);
        search.parentNode.replaceChild(newSearch, search);
    }

    if (pages) {
        const newPages = pages.cloneNode(true);
        pages.parentNode.replaceChild(newPages, pages);
    }

    if (genres) {
        const newGenres = genres.cloneNode(true);
        genres.parentNode.replaceChild(newGenres, genres);
    }
}

// Función para inicializar el contenido
export function initContent() {
    const categories = document.getElementById('categories');

    // Función para manejar la lógica de cada categoría
    function handleCategory(action) {
        const content = document.getElementById('content');

        // Limpiar el contenido y los event listeners anteriores
        if (content) {
            content.innerHTML = '';
        }

        // Remover todos los event listeners anteriores
        removeEventListeners();

        // Actualizar la categoría actual
        currentCategory = action;

        switch (action) {
            case 'animes':
                showAnimes({ page: 1 }); // Aseguramos que empiece en la primera página
                showAnimesGenres();
                animePages();
                filterByAnimeGenre(currentCategory);
                filterByAnimeSearch();
                break;

            case 'mangas':
                showMangas({ page: 1 }); // Aseguramos que empiece en la primera página
                showMangasGenres();
                mangaPages();
                filterByMangaGenre(currentCategory);
                filterByMangaSearch();
                break;
            default:
                console.log('Categoría no reconocida:', action);
        }
    }

    if (categories) {
        // Primero, buscamos el botón activo. Esto es para la primera carga de la página
        const activeButton = categories.querySelector('.active');

        // Si hay un botón activo, ejecutamos su acción
        if (activeButton && activeButton.dataset.action) {
            handleCategory(activeButton.dataset.action);
        }

        // Manejamos los clicks en las categorías
        categories.addEventListener('click', (e) => {
            const button = e.target.closest('[data-action]');
            if (button) {
                // Quitamos la clase active de todos los botones
                categories.querySelectorAll('.active').forEach(btn => {
                    btn.classList.remove('active');
                });

                // Añadimos la clase active al botón clickeado
                button.classList.add('active');

                // Ejecutamos la acción
                handleCategory(button.dataset.action);
            }
        });
    }
}