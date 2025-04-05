import { fetchAnime, fetchAnimeGenres } from './modules/api.js';

// Elementos del DOM
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

// Estado
let currentPage = 1;

// Event Listeners
if (nextButton) {
    nextButton.addEventListener("click", () => {
        currentPage++;
        fetchAnime(currentPage);
    });
}

if (prevButton) {
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            fetchAnime(currentPage);
        }
    });
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    // Cargar la primera página de animes
    fetchAnime(currentPage);
    // Cargar los géneros
    fetchAnimeGenres();
});