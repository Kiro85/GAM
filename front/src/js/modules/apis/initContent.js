import { showAnimes, showAnimesTops, showAnimesGenres, animePages, filterByAnimeGenre, filterByAnimeSearch } from './anime.js';
import { showMangas, showMangasTops, showMangasGenres, mangaPages, filterByMangaGenre, filterByMangaSearch } from './mangas.js';

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

// Función para resetear el selector a catalog
function resetSelectorToCatalog() {
    const selector = document.getElementById('selector');
    const content = document.getElementById('content');

    if (selector && content) {
        // Quitamos la clase active de todos los botones
        selector.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('selector--active');
        });

        // Añadimos la clase active al botón de catalog
        const catalogButton = selector.querySelector('#catalog');
        if (catalogButton) {
            catalogButton.classList.add('selector--active');
        }

        // Actualizamos el estado del contenido
        content.dataset.action = 'catalog';
    }
}

// Función para inicializar el contenido
function initContent() {
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

        // Obtenemos el estado actual del selector (catalog/tops)
        const currentAction = content.dataset.action || 'catalog';

        switch (action) {
            case 'animes':
                showAnimesGenres();
                animePages();
                filterByAnimeGenre(currentCategory);
                filterByAnimeSearch();
                handleContent(currentCategory);
                // Mantenemos el estado del selector
                if (currentAction === 'tops') {
                    showAnimesTops();
                } else {
                    showAnimes({ page: 1 });
                }
                break;

            case 'mangas':
                showMangasGenres();
                mangaPages();
                filterByMangaGenre(currentCategory);
                filterByMangaSearch();
                handleContent(currentCategory);
                // Mantenemos el estado del selector
                if (currentAction === 'tops') {
                    showMangasTops();
                } else {
                    showMangas({ page: 1 });
                }
                break;
            default:
                console.log('Categoría no reconocida:', action);
        }
    }

    if (categories) {
        // Primero, buscamos el botón activo. Esto es para la primera carga de la página
        const activeButton = categories.querySelector('.selector--active');

        // Si hay un botón activo, ejecutamos su acción
        if (activeButton && activeButton.dataset.action) {
            handleCategory(activeButton.dataset.action);
        }

        // Manejamos los clicks en las categorías
        categories.addEventListener('click', (e) => {
            const button = e.target.closest('[data-action]');
            if (button) {
                // Quitamos la clase active de todos los botones
                categories.querySelectorAll('.selector--active').forEach(btn => {
                    btn.classList.remove('selector--active');
                });

                // Añadimos la clase active al botón clickeado
                button.classList.add('selector--active');

                // Ejecutamos la acción
                handleCategory(button.dataset.action);
            }
        });
    }
}

// Función para manejar el selector de contenido (catalogo y tops)
function handleContent(currentCategory) {
    const content = document.getElementById('content');
    const selector = document.getElementById('selector');

    if (content && selector) {
        // Quitamos cualquier event listener anterior
        const newSelector = selector.cloneNode(true);
        selector.parentNode.replaceChild(newSelector, selector);

        // Obtenemos el estado actual del selector
        const currentAction = content.dataset.action || 'catalog';

        // Añadimos el nuevo event listener
        newSelector.addEventListener('click', (e) => {
            const button = e.target.closest('button');

            // Quitamos la clase active de todos los botones
            newSelector.querySelectorAll('button').forEach(btn => {
                btn.classList.remove('selector--active');
            });

            // Añadimos la clase active al botón clickeado
            button.classList.add('selector--active');

            if (button.id === 'catalog') {
                content.dataset.action = 'catalog';
                currentCategory === 'animes' ? showAnimes({ page: 1 }) : showMangas({ page: 1 });
            } else if (button.id === 'tops') {
                content.dataset.action = 'tops';
                currentCategory === 'animes' ? showAnimesTops() : showMangasTops();
            }
        });

        // Establecemos el estado inicial basado en el estado actual
        const activeButton = newSelector.querySelector(`#${currentAction}`);
        if (activeButton) {
            activeButton.classList.add('selector--active');
        } else {
            // Si no hay estado actual, usamos catalog por defecto
            const catalogButton = newSelector.querySelector('#catalog');
            if (catalogButton) {
                catalogButton.classList.add('selector--active');
            }
        }
    }
}

export { initContent, resetSelectorToCatalog };