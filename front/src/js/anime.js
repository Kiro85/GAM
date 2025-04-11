import { fetchAnime, fetchAnimeGenres } from './modules/api.js';
import { createAnimeCard } from './modules/card.js';
import { showAnimeModal } from './modules/modal.js';
import { setLoadingState, setTotalPages, getCurrentPage } from './modules/pagination.js';

// Elementos del DOM
const content = document.getElementById("content");
const genres = document.getElementById("genres");
const searchInput = document.querySelector(".search__input");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

// Si no estamos en la página de animes, salimos
if (!content || !genres) {
    console.log("No estamos en la página de animes");
    throw new Error("No estamos en la página de animes");
}

// Estado de la aplicación
let currentGenre = '';
let currentSearch = '';

// Función para cargar animes
async function loadAnimes() {
    try {
        setLoadingState(true);
        const page = getCurrentPage();
        const response = await fetchAnime(page, currentGenre, currentSearch);

        if (response && response.data) {
            content.innerHTML = '';
            response.data.forEach(anime => {
                const card = createAnimeCard(anime);
                content.appendChild(card);
            });

            // Actualizar el total de páginas
            setTotalPages(response.pagination?.last_visible_page || 1);
        }
    } catch (error) {
        console.error('Error al cargar animes:', error);
        content.innerHTML = '<p class="error">Error al cargar los animes. Por favor, intenta de nuevo.</p>';
    } finally {
        setLoadingState(false);
    }
}

// Función para cargar géneros
async function loadGenres() {
    try {
        const genresData = await fetchAnimeGenres();
        if (genresData && genres) {
            genres.innerHTML = '';
            genresData.forEach(genre => {
                const button = document.createElement('button');
                button.classList.add('btn-genres');
                button.textContent = genre.name;
                button.dataset.genreId = genre.mal_id;
                genres.appendChild(button);
            });
        }
    } catch (error) {
        console.error('Error al cargar géneros:', error);
    }
}

// Event Listeners
if (genres) {
    genres.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-genres')) {
            currentGenre = e.target.dataset.genreId;
            loadAnimes();
        }
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.trim();
        loadAnimes();
    });
}

// Evento para cambios de página
window.addEventListener('pageChange', () => {
    loadAnimes();
});

// Inicializar la aplicación
loadGenres();
loadAnimes(); 