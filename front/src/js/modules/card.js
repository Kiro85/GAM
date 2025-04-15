import { showAnimeModal } from './modal.js';

export function createAnimeCard(anime) {
    // Creamos el elemento de la card
    const card = document.createElement('article');
    card.classList.add('card');

    // Creamos el template de la card
    const template = `
        <section class="card__content">
            <section class="card__back">
                <section class="card__back-content">
                    <img class="card__back-img" 
                         src="${anime.images.webp.large_image_url}" 
                         alt="portada"
                         loading="lazy">
                </section>
            </section>

            <section class="card__front">
                <section class="card__front-container-img">
                    <img class="card__front-img" 
                         src="${anime.images.webp.image_url}" 
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

    // Insertamos el template en la card
    card.innerHTML = template;

    // Agregamos el evento de clic para mostrar el modal
    card.addEventListener("click", () => showAnimeModal(anime));

    // Devolvemos la card
    return card;
} 