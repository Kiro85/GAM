import { Backend } from '../../config.js';

export function fetchUsers(searchTerm) {
    return new Promise((resolve, reject) => {
        try {
            var http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(this.responseText);
                    } else {
                        reject(new Error('Error al obtener el contenido: ' + this.status));
                    }
                }
            };

            http.open("GET", `${Backend}/SearchUsers?userToken=` + localStorage.getItem('authToken') + "&search=" + searchTerm, true);
            http.send();

        } catch (error) {
            reject(error);
        }
    });
}