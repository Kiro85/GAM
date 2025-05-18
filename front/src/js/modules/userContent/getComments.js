function getCommentsFromDB(contentId) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("commentsList").innerHTML = this.responseText;
            }
        };

        http.open("GET", "http://localhost:8080/GAM/GetComments?contentId=" + contentId, true);
        http.send();

    } catch (error) {
        console.error('Error al guardar el contenido:', error);
    }
}

function getComments() {
    const comments = document.getElementById("commentsList");

    if (comments) {
        comments.innerHTML = "";

        let modal = comments.closest(".modal");
        let contentId = modal.dataset.contentId;

        getCommentsFromDB(contentId);
    }
}

export { getComments };