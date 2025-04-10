import { createAnimeCard } from './card.js';

// Elementos del DOM
const content = document.getElementById("content");
const generos = document.getElementById("generos");

// Funciones auxiliares
function showError(message, element = content) {
    element.innerHTML = `
        <div class="error-message">
            <i class="bi bi-exclamation-triangle"></i>
            <p>${message}</p>
            <button class="btn" onclick="window.location.reload()">Reintentar</button>
        </div>
    `;
}

function showLoading() {
    content.innerHTML = `
        <div class="loading-state">
            <i class="bi bi-arrow-repeat"></i>
            <p>Cargando...</p>
        </div>
    `;
}

// URL base de la API
const API_URL = 'https://api.jikan.moe/v4';

// Función para obtener animes
export async function fetchAnime(page = 1, genre = '', search = '') {
    try {
        let url = `${API_URL}/top/anime?page=${page}`;

        if (genre) {
            url = `${API_URL}/anime?page=${page}&genres=${genre}`;
        }

        if (search) {
            url = `${API_URL}/anime?page=${page}&q=${encodeURIComponent(search)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        // Si no estamos filtrando por género o búsqueda, ordenar por ranking
        if (!genre && !search) {
            data.data.sort((a, b) => a.rank - b.rank);
        }

        return data;
    } catch (error) {
        console.error('Error al obtener animes:', error);
        throw error;
    }
}

// Función para obtener géneros
export async function fetchAnimeGenres() {
    try {
        const response = await fetch(`${API_URL}/genres/anime?filter=genres`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error al obtener géneros:', error);
        throw error;
    }
} 