export function fetchMangas({ page = 1, genre = '', search = '', limit = '' } = {}) {
    return new Promise((resolve, reject) => {
        // Establecemos la url de la API con los parametros de la petición
        let url = `http://localhost:8080/GAM/FetchMangas?page=${page}`;
        if (genre) url += `&genre=${encodeURIComponent(genre)}`;
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (limit) url += `&limit=${encodeURIComponent(limit)}`;

        // Conectamos con el backend
        const http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        const data = JSON.parse(this.responseText);
                        resolve(data); // Promesa resuelta con los datos
                    } catch (e) {
                        reject('Error al parsear la respuesta JSON');
                    }
                } else {
                    reject(`Error al obtener mangas del backend. Status: ${this.status}. Respuesta: ${this.responseText}`);
                }
            }
        }

        http.open("GET", url, true);
        http.send();
    });
}