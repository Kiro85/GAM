let currentPage = 1; // Página actual
const div = document.getElementById("anime");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

function fetchAnime(page) {
    fetch(`https://api.jikan.moe/v4/top/anime`)
        .then(res => res.json())
        .then(response => {
            div.innerHTML = ""; // Limpiar el contenido anterior

            response.data.forEach(e => {
                const img = document.createElement("img");
                img.src = e.images.jpg.image_url;
                img.alt = e.title;
                img.style.width = "150px";
                img.style.margin = "5px";

                div.appendChild(img);
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