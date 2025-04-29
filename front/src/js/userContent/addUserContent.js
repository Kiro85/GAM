function saveContent(externalId, contentType, rating, position) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                return this.responseText;
            }
        };

        http.open("POST", "http://localhost:8080/GAM/SaveContent", true);
        http.send("userToken=" + localStorage.getItem('authToken') + "&externalId=" + externalId + "&contentType=" + contentType + "&rating=" + rating + "&position=" + position);

    } catch (error) {
        console.error('Error al guardar el contenido:', error);
    }
}

function addToCollection() {
    const saveBtn = document.getElementById("addToCollection");

    saveBtn.addEventListener("click", () => {
        let card = saveBtn.closest(".card__content");
        let contentType = card.dataset.contentType;
        let contentId = card.dataset.contentId;
        let rating = document.getElementById("rating").value;
        let position = document.getElementById("topSelect").value;

        saveContent(contentId, contentType, rating, position);
    });
}

export { addToCollection };