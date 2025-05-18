function removeContent(externalId, contentType) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                window.location.reload();
            }
        };

        http.open("POST", "http://localhost:8080/GAM/RemoveContent", true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("userToken=" + localStorage.getItem('authToken') + "&externalId=" + externalId + "&contentType=" + contentType);

    } catch (error) {
        console.error('Error al eliminar el contenido:', error);
    }
}

function removeFromCollection() {
    const removeBtn = document.getElementById("removeFromCollection");

    if (removeBtn) {
        removeBtn.addEventListener("click", () => {
            let modal = removeBtn.closest(".modal");
            let contentType = modal.dataset.contentType;
            let contentId = modal.dataset.contentId;

            removeContent(contentId, contentType);
        });
    }
}

export { removeFromCollection };