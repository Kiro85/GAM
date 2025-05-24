import { Backend } from '../../config.js';

function getSavedContent(userId, contentType) {
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

            http.open("GET", `${Backend}/GetSavedContent?userToken=` + localStorage.getItem('authToken') + "&userId=" + userId + "&contentType=" + contentType, true);
            http.send();

        } catch (error) {
            reject(error);
        }
    });
}

async function getSavedAnimes(userId) {
    try {
        let savedContent;

        if (userId) {
            savedContent = await getSavedContent(userId, "anime");
        } else {
            savedContent = await getSavedContent(-1, "anime");
        }

        console.log(savedContent);
        return savedContent;
    } catch (error) {
        console.error('Error al mostrar animes:', error);
    }
}

async function getSavedMangas(userId) {
    try {
        let savedContent;

        if (userId) {
            savedContent = await getSavedContent(userId, "manga");
        } else {
            savedContent = await getSavedContent(-1, "manga");
        }

        console.log(savedContent);
        return savedContent;
    } catch (error) {
        console.error('Error al mostrar mangas:', error);
    }
}

// Función para obtener la posición de un anime
async function getAnimePosition(animeId) {
    return new Promise((resolve, reject) => {
        try {
            var http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(parseInt(this.responseText) || 0);
                    } else {
                        reject(new Error('Error al obtener la posición: ' + this.status));
                    }
                }
            };

            http.open("POST", `${Backend}/GetContentPosition`, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.send("userToken=" + localStorage.getItem('authToken') +
                "&externalId=" + animeId +
                "&contentType=anime");

        } catch (error) {
            console.error('Error al obtener la posición del anime:', error);
            reject(error);
        }
    });
}

// Función para obtener la posición de un manga
async function getMangaPosition(mangaId) {
    return new Promise((resolve, reject) => {
        try {
            var http = new XMLHttpRequest();

            http.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        resolve(parseInt(this.responseText) || 0);
                    } else {
                        reject(new Error('Error al obtener la posición: ' + this.status));
                    }
                }
            };

            http.open("POST", `${Backend}/GetContentPosition`, true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.send("userToken=" + localStorage.getItem('authToken') +
                "&externalId=" + mangaId +
                "&contentType=manga");

        } catch (error) {
            console.error('Error al obtener la posición del manga:', error);
            reject(error);
        }
    });
}

export { getSavedAnimes, getSavedMangas, getAnimePosition, getMangaPosition };