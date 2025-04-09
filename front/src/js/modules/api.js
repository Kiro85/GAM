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

// Funciones principales
export function fetchAnime(page) {
    console.log('Fetching anime page:', page);
    showLoading();

    fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
        .then(res => res.json())
        .then(data => {
            console.log('Received anime data:', data);
            if (!data.data || !Array.isArray(data.data)) {
                throw new Error('Datos inválidos');
            }

            content.innerHTML = "";
            data.data.forEach(anime => {
                const card = createAnimeCard(anime);
                content.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching anime:', error);
            showError('Error al cargar los datos');
        });
}

export function fetchAnimeGenres() {
    console.log('Fetching genres');
    generos.innerHTML = `
        <div class="loading-state">
            <i class="bi bi-arrow-repeat"></i>
            <p>Cargando géneros...</p>
        </div>
    `;

    fetch(`https://api.jikan.moe/v4/genres/anime?filter=genres`)
        .then(res => res.json())
        .then(data => {
            console.log('Received genres data:', data);
            if (!data.data || !Array.isArray(data.data)) {
                throw new Error('Datos inválidos');
            }

            generos.innerHTML = "";
            data.data.forEach(genre => {
                const btn = document.createElement("button");
                btn.classList.add("btn-generos");
                btn.innerText = genre.name;
                generos.appendChild(btn);
            });

            if (data.data.length === 0) {
                showError('No se encontraron géneros', generos);
            }
        })
        .catch(error => {
            console.error('Error fetching genres:', error);
            showError('Error al cargar los géneros', generos);
        });
} 