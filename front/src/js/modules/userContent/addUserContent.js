function saveContent(externalId, contentType, rating, position) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
            }
        };

        http.open("POST", "http://localhost:8080/GAM/SaveContent", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("userToken=" + localStorage.getItem('authToken') + "&externalId=" + externalId + "&contentType=" + contentType + "&rating=" + rating + "&position=" + position);

    } catch (error) {
        console.error('Error al guardar el contenido:', error);
    }
}

function addToCollection() {
    const saveBtn = document.getElementById("addToCollection");

    if (saveBtn) {
        saveBtn.addEventListener("click", () => {
            let modal = saveBtn.closest(".modal");
            let contentType = modal.dataset.contentType;
            let contentId = modal.dataset.contentId;
            let rating = document.getElementById("rating").value;
            let position = document.getElementById("topSelect").value;

        if (position == "") {
            position = 0;
        }

            saveContent(contentId, contentType, rating, position);
        });
    }
}

export { addToCollection };