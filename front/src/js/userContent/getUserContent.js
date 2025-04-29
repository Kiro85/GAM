function getSavedContent(contentType) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                return this.responseText;
            }
        };

        http.open("GET", "http://localhost:8080/GAM/GetSavedContent", true);
        http.send("userToken=" + localStorage.getItem('authToken') + "&contentType=" + contentType);

    } catch (error) {
        console.error('Error al obtener el contenido guardado:', error);
    }
}

function showAnimes() {
    let savedContent = getSavedContent("anime");
    console.log(savedContent);
}

function showMangas() {
    let savedContent = getSavedContent("manga");
    console.log(savedContent);
}

export { showAnimes, showMangas };