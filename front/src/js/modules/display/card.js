import { showModal } from './modal.js';

export function createCard(contentType, content) {
    // Creamos el elemento de la card
    const card = document.createElement('article');
    card.classList.add('card');

    const template = `
        <section class="card__content">
            <section class="card__back">
                <section class="card__back-content">
                    <img class="card__back-img" 
                        src="${content.images.webp.large_image_url}" 
                        alt="portada"
                        loading="lazy">
                </section>
            </section>

            <section class="card__front">
                <section class="card__front-container-img">
                    <img class="card__front-img" 
                        src="${content.images.webp.image_url}" 
                        alt="contraportada"
                        loading="lazy">
                </section>

                <section class="card__front-content">
                    <small class="card__badge">${content.title_english || content.title}</small>
                    <section class="card__description">
                        <header class="card__title">
                            <h3 class="card__title-text"><strong>Top: #${content.rank}</strong></h3>
                        </header>
                        <footer class="card__footer"><p>${content.genres[0]?.name || "Sin género"} &nbsp; | &nbsp; Capitulos: ${content.episodes || content.chapters || "N/A"}</p></footer>
                    </section>
                </section>
            </section>
        </section>
    `;

    // Insertamos el template en la card
    card.innerHTML = template;

    // Agregamos el evento de clic para mostrar el modal
    card.addEventListener("click", () => showModal(contentType, content));

    // Devolvemos la card
    return card;
}