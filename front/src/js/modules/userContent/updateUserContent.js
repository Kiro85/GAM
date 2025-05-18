function updateContent(externalId, contentType, rating, position) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                window.location.reload();
            }
        };

        http.open("POST", "http://localhost:8080/GAM/UpdateContent", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("userToken=" + localStorage.getItem('authToken') + "&externalId=" + externalId + "&contentType=" + contentType + "&rating=" + rating + "&position=" + position);

    } catch (error) {
        console.error('Error al actualizar el contenido:', error);
    }
}

function updateFromCollection() {
    const updateBtn = document.getElementById("updateContent");

    if (updateBtn) {
        updateBtn.addEventListener("click", () => {
            let modal = updateBtn.closest(".modal");
            let contentType = modal.dataset.contentType;
            let contentId = modal.dataset.contentId;
            let rating = document.getElementById("rating").value;
            let position = document.getElementById("topSelect").value;

            if (position == "") {
                position = 0;
            }

            updateContent(contentId, contentType, rating, position);
        });
    }
}

export { updateFromCollection }; 