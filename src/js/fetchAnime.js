let currentPage = 1; // Página actual
const content = document.getElementById("content");
const generos = document.getElementById("generos");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const modal = document.getElementById("animeModal");
const modalClose = modal.querySelector(".modal__close");

// Función para mostrar el modal con la información del anime
function showAnimeModal(anime) {
    const modalImage = modal.querySelector(".modal__image");
    const modalTitle = modal.querySelector(".modal__title");
    const modalDetails = modal.querySelector(".modal__details");
    const modalSynopsis = modal.querySelector(".modal__synopsis");

    modalImage.src = anime.images.webp.large_image_url;
    modalTitle.textContent = anime.title;
    modalDetails.innerHTML = `
        <div><strong>Rank:</strong> #${anime.rank}</div>
        <div><strong>Episodios:</strong> ${anime.episodes || "N/A"}</div>
        <div><strong>Estado:</strong> ${anime.status}</div>
        <div><strong>Género:</strong> ${anime.genres[0]?.name || "N/A"}</div>
        <div><strong>Puntuación:</strong> ${anime.score || "N/A"}</div>
        <div><strong>Estudios:</strong> ${anime.studios[0]?.name || "N/A"}</div>
    `;
    modalSynopsis.textContent = anime.synopsis || "Sin sinopsis disponible.";

    modal.style.display = "block";
}

// Cerrar el modal
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

// Cerrar el modal al hacer clic fuera
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

export function fetchAnime(page) {
    fetch(`https://api.jikan.moe/v4/top/anime?page=${page}`)
        .then(res => res.json())
        .then(response => {
            content.innerHTML = ""; // Limpiar el contenido anterior

            // Verificar si hay más páginas
            if (!response.pagination.has_next_page) {
                nextButton.disabled = true; // Deshabilitar el botón "Siguiente"
            } else {
                nextButton.disabled = false; // Habilitar el botón "Siguiente"
            }

            response.data.forEach(e => {
                let plantilla = `
                    <section class="card__content">
                        <section class="card__back">
                            <section class="card__back-content">
                                <img class="card__back-img" src="${e.images.webp.large_image_url}" alt="portada">
                            </section>
                        </section>

                        <section class="card__front">
                            <section class="card__front-container-img">
                                <img class="card__front-img" src="${e.images.webp.image_url}" alt="contraportada">
                            </section>

                            <section class="card__front-content">
                                <small class="card__badge">${e.title}</small>
                                <section class="card__description">
                                    <header class="card__title">
                                        <h3 class="card__title-text"><strong>Top: #${e.rank}</strong></h3>
                                    </header>
                                    <footer class="card__footer"><p>${e.genres[0]?.name || "Sin género"} &nbsp; | &nbsp; Capitulos: ${e.episodes || "N/A"}</p></footer>
                                </section>
                            </section>
                        </section>
                    </section>
                `;

                let article = document.createElement("article");
                article.classList.add("card");
                article.innerHTML = plantilla;

                // Agregar evento de clic para mostrar el modal
                article.addEventListener("click", () => showAnimeModal(e));

                content.appendChild(article);
            });
        })
        .catch(error => console.error("Error al obtener datos:", error));
}

// Manejar clic en el botón "Siguiente"
nextButton.addEventListener("click", () => {
    currentPage++;
    fetchAnime(currentPage);
});

// Manejar clic en el botón "Anterior"
prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchAnime(currentPage);
    }
});

// Cargar la primera página al inicio
fetchAnime(currentPage);


export function fetchAnimeGenres() {
    fetch(`https://api.jikan.moe/v4/genres/anime?filter=genres`)
        .then(res => res.json())
        .then(response => {
            generos.innerHTML = ""; // Limpiar el contenido anterior

            response.data.forEach(e => {
                let btn = document.createElement("button");
                btn.classList.add("btn-generos");
                btn.innerText = e.name

                generos.appendChild(btn);
            });
        })
        .catch(error => console.error("Error al obtener datos:", error));
}

fetchAnimeGenres();