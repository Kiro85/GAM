// Cache para las imágenes
const imageCache = new Map();
const MAX_CACHE_SIZE = 50; // Máximo número de imágenes en caché

// Función para optimizar la URL de la imagen
export function optimizeImageUrl(url, size = 'medium') {
    if (!url) return '';
    return url.replace('large_image_url', `${size}_image_url`);
}

// Función para limpiar el caché cuando excede el tamaño máximo
function cleanCache() {
    if (imageCache.size > MAX_CACHE_SIZE) {
        const keys = Array.from(imageCache.keys());
        const keysToDelete = keys.slice(0, imageCache.size - MAX_CACHE_SIZE);
        keysToDelete.forEach(key => imageCache.delete(key));
    }
}

// Función para precargar imágenes
export function preloadImage(url) {
    return new Promise((resolve, reject) => {
        if (imageCache.has(url)) {
            resolve(imageCache.get(url));
            return;
        }

        const img = new Image();

        // Configurar timeout para la carga de imágenes
        const timeout = setTimeout(() => {
            img.src = ''; // Cancelar la carga
            reject(new Error('Tiempo de espera agotado al cargar la imagen'));
        }, 10000); // 10 segundos de timeout

        img.onload = () => {
            clearTimeout(timeout);
            cleanCache(); // Limpiar caché si es necesario
            imageCache.set(url, img);
            resolve(img);
        };

        img.onerror = (error) => {
            clearTimeout(timeout);
            reject(new Error('Error al cargar la imagen'));
        };

        img.src = url;
    });
}

// Intersection Observer para lazy loading
export const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
                img.src = src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px 0px',
    threshold: 0.1
}); 