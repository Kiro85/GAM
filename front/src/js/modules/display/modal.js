// Elementos del DOM
const modal = document.getElementById("modal");
const modalClose = modal ? modal.querySelector(".modal__close") : null;

// Función para cerrar el modal
function closeModal() {
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Función para mostrar el modal con la información
export async function showModal(contentType, content) {
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

            if (content && contentType === 'anime') {
                // Actualizamos el contenido del modal para anime
                modalTitle.textContent = content.title_english || content.title;
                modalDetails.innerHTML = `
                    <div><strong>Rank:</strong> #${content.rank}</div>
                    <div><strong>Episodios:</strong> ${content.episodes || "N/A"}</div>
                    <div><strong>Estado:</strong> ${content.status}</div>
                    <div><strong>Género:</strong> ${content.genres[0]?.name || "N/A"}</div>
                    <div><strong>Puntuación:</strong> ${content.score || "N/A"}</div>
                    <div><strong>Estudios:</strong> ${content.studios[0]?.name || "N/A"}</div>
                `;
                modalSynopsis.textContent = content.synopsis || "Sin sinopsis disponible.";
                modalImage.src = content.images.webp.large_image_url;

            } else if (content && contentType === 'manga') {
                // Actualizamos el contenido del modal para manga
                modalTitle.textContent = content.title_english || content.title;
                modalDetails.innerHTML = `
                    <div><strong>Rank:</strong> #${content.rank}</div>
                    <div><strong>Capítulos:</strong> ${content.chapters || "N/A"}</div>
                    <div><strong>Estado:</strong> ${content.status}</div>
                    <div><strong>Género:</strong> ${content.genres[0]?.name || "N/A"}</div>
                    <div><strong>Puntuación:</strong> ${content.score || "N/A"}</div>
                    <div><strong>Autor:</strong> ${content.authors[0]?.name || "N/A"}</div>
                `;
                modalSynopsis.textContent = content.synopsis || "Sin sinopsis disponible.";
                modalImage.src = content.images.webp.large_image_url;
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
    }
}
