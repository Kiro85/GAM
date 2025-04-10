// Estado de la paginación
let currentPage = 1;
let totalPages = 1;
let isLoading = false;

// Elementos del DOM
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");
const pageIndicator = document.getElementById("pageIndicator");

// Función para actualizar el estado de los botones
function updatePaginationButtons() {
    if (prevButton) {
        prevButton.disabled = currentPage <= 1 || isLoading;
        prevButton.classList.toggle('disabled', prevButton.disabled);
    }

    if (nextButton) {
        nextButton.disabled = currentPage >= totalPages || isLoading;
        nextButton.classList.toggle('disabled', nextButton.disabled);
    }

    if (pageIndicator) {
        pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
    }
}

// Función para actualizar el estado de carga
export function setLoadingState(loading) {
    isLoading = loading;
    updatePaginationButtons();
}

// Función para actualizar el total de páginas
export function setTotalPages(total) {
    totalPages = total;
    updatePaginationButtons();
}

// Función para obtener la página actual
export function getCurrentPage() {
    return currentPage;
}

// Función para ir a la página siguiente
export function nextPage() {
    if (currentPage < totalPages && !isLoading) {
        currentPage++;
        updatePaginationButtons();
        return true;
    }
    return false;
}

// Función para ir a la página anterior
export function prevPage() {
    if (currentPage > 1 && !isLoading) {
        currentPage--;
        updatePaginationButtons();
        return true;
    }
    return false;
}

// Función para ir a una página específica
export function goToPage(page) {
    if (page >= 1 && page <= totalPages && !isLoading) {
        currentPage = page;
        updatePaginationButtons();
        return true;
    }
    return false;
}

// Inicializar los botones
if (nextButton && prevButton) {
    nextButton.addEventListener("click", () => {
        if (nextPage()) {
            // Emitir evento para que el componente padre sepa que debe cargar la siguiente página
            window.dispatchEvent(new CustomEvent('pageChange', { detail: currentPage }));
        }
    });

    prevButton.addEventListener("click", () => {
        if (prevPage()) {
            // Emitir evento para que el componente padre sepa que debe cargar la página anterior
            window.dispatchEvent(new CustomEvent('pageChange', { detail: currentPage }));
        }
    });
}

// Inicializar el estado
updatePaginationButtons(); 