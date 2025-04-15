// Elementos del DOM
const modal = document.getElementById("animeModal");
const modalClose = modal ? modal.querySelector(".modal__close") : null;

// Función para cerrar el modal
function closeModal() {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Función para mostrar el modal con la información del anime
export async function showAnimeModal(anime) {
    if (modal) {
        // Obtenemos los elementos del modal
        const modalImage = modal.querySelector(".modal__image");
        const modalTitle = modal.querySelector(".modal__title");
        const modalDetails = modal.querySelector(".modal__details");
        const modalSynopsis = modal.querySelector(".modal__synopsis");

        if (modalImage && modalTitle && modalDetails && modalSynopsis) {
            // Mostrar el modal inmediatamente
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
    
            // Actualizamos el contenido del modal
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
            modalImage.src = anime.images.webp.large_image_url;
        }
    }

}

// Inicializar event listeners si el modal existe
if (modal && modalClose) {
    modalClose.addEventListener("click", closeModal);

    // Cerrar el modal al hacer clic fuera
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar el modal con la tecla ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.style.display === "block") {
            closeModal();
        }
    });
}