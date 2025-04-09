import { optimizeImageUrl, imageObserver } from './imageLoader.js';
import { showAnimeModal } from './modal.js';

export function createAnimeCard(anime) {
    const card = document.createElement('article');
    card.classList.add('card');

    const template = `
        <section class="card__content">
            <section class="card__back">
                <section class="card__back-content">
                    <img class="card__back-img" 
                         data-src="${optimizeImageUrl(anime.images.webp.large_image_url, 'small')}" 
                         alt="portada"
                         loading="lazy">
                </section>
            </section>

            <section class="card__front">
                <section class="card__front-container-img">
                    <img class="card__front-img" 
                         data-src="${optimizeImageUrl(anime.images.webp.image_url, 'small')}" 
                         alt="contraportada"
                         loading="lazy">
                </section>

                <section class="card__front-content">
                    <small class="card__badge">${anime.title}</small>
                    <section class="card__description">
                        <header class="card__title">
                            <h3 class="card__title-text"><strong>Top: #${anime.rank}</strong></h3>
                        </header>
                        <footer class="card__footer"><p>${anime.genres[0]?.name || "Sin género"} &nbsp; | &nbsp; Capitulos: ${anime.episodes || "N/A"}</p></footer>
                    </section>
                </section>
            </section>
        </section>
    `;

    card.innerHTML = template;

    // Observar imágenes para lazy loading
    const images = card.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));

    // Agregar evento de clic para mostrar el modal
    card.addEventListener("click", () => showAnimeModal(anime));

    return card;
} 