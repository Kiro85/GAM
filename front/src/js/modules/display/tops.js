import { showModal } from './modal.js';

export function createTop(contentType, content) {
    // Creamos el elemento de la card
    const top = document.createElement('article');
    top.classList.add('top');

    // Añadimos una clase especial para el top 1, 2 y 3 o normal
    let showRibbon = false;
    let ribbonClass = '';

    if (content.rank === 1) {
        top.classList.add('top--first');
        showRibbon = true;
        ribbonClass = 'top__ribbon--first';
    } else if (content.rank === 2) {
        top.classList.add('top--second');
        showRibbon = true;
        ribbonClass = 'top__ribbon--second';
    } else if (content.rank === 3) {
        top.classList.add('top--third');
        showRibbon = true;
        ribbonClass = 'top__ribbon--third';
    } else {
        top.classList.add('top--normal');
    }

    const template = `
        <section class="top__content">
            ${showRibbon ? `<span class="top__ribbon ${ribbonClass}">#${content.rank}</span>` : ''}
            <section class="top__back">
                <section class="top__back-content">
                    <img class="top__back-img" 
                        src="${content.images.webp.large_image_url}" 
                        alt="portada"
                        loading="lazy">
                </section>
            </section>

            <section class="top__front">
                <section class="top__front-content">
                    <section class="top__description">
                        <header class="top__title">
                            <h3 class="top__title-text">${content.title_english || content.title}</h3>
                        </header>
                        <p class="top__info-text">${content.synopsis ? content.synopsis.substring(0, 100) + '...' : ''}</p>
                        <footer class="top__footer"><p>${content.genres[0]?.name || "Sin género"} &nbsp; | &nbsp; Capitulos: ${content.episodes || content.chapters || "N/A"}</p></footer>
                    </section>
                </section>
            </section>
        </section>
    `;

    // Insertamos el template en la card
    top.innerHTML = template;

    // Agregamos el evento de clic para mostrar el modal
    top.addEventListener("click", () => showModal(contentType, content));

    // Devolvemos la card
    return top;
}