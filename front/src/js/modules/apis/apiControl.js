// Función de debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para mostrar mensajes de error
function showError(content, error, params, retryFunction) {
    let errorMessage = '';

    // Personalizamos el mensaje según el error
    if (error.includes('429')) {
        errorMessage = `
            <div class="error-message">
                <p>¡Demasiadas peticiones!</p>
                <p>Por favor, espera unos segundos antes de realizar más búsquedas</p>
                <button class="reload-button">Reintentar</button>
            </div>`;
    } else if (error.includes('404')) {
        errorMessage = `
            <div class="error-message">
                <p>No se encontró lo que buscabas</p>
                <button class="reload-button">Reintentar</button>
            </div>`;
    } else {
        errorMessage = `
            <div class="error-message">
                <p>Ha ocurrido un error inesperado</p>
                <p>Por favor, inténtalo de nuevo más tarde</p>
                <button class="reload-button">Reintentar</button>
            </div>`;
    }

    content.innerHTML = errorMessage;

    // Añadimos el event listener para el botón de recarga
    const reloadButton = content.querySelector('.reload-button');
    if (reloadButton) {
        reloadButton.addEventListener('click', () => {
            if (retryFunction) {
                retryFunction(params);
            }
        });
    }
}

// Función para mostrar el estado de carga
function showLoadingState(element) {
    element.innerHTML = `
        <div class="loading-state">
            <p>Cargando...</p>
            <i class="fas fa-spinner fa-spin"></i>
        </div>`;
}

export { debounce, showError, showLoadingState };