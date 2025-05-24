import { Backend } from '../../config.js';

export function fetchAnimesGenres() {
    return new Promise((resolve, reject) => {

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
                    reject(`Error al obtener generos del backend. Status: ${this.status}. Respuesta: ${this.responseText}`);
                }
            }
        }

        http.open("GET", `${Backend}/FetchAnimesGenres`, true);
        http.send();
    });
}