import { Backend } from '../../config.js';

export function getUserProfile(username) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            }
        };

        http.open("GET", `${Backend}/GetUserProfile?username=` + username, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send();

    } catch (error) {
        console.error('Error al guardar el contenido:', error);
    }
}