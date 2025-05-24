import { getComments } from './getComments.js';
import { Backend } from '../../config.js';
function addCommentToDB(comment, contentId) {
    try {
        var http = new XMLHttpRequest();

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                alert(this.responseText);
                getComments();
            }
        };

        http.open("POST", `${Backend}/AddComment`, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        http.send("userToken=" + localStorage.getItem('authToken') + "&comment=" + comment + "&contentId=" + contentId);

    } catch (error) {
        console.error('Error al guardar el contenido:', error);
    }
}

function addComment() {
    const addCommentButton = document.getElementById("addComment");

    if (addCommentButton) {
        addCommentButton.addEventListener("click", () => {
            let modal = addCommentButton.closest(".modal");
            let contentId = modal.dataset.contentId;
            let commentText = document.getElementById("commentText").value;

            if (commentText.length > 0) {
                addCommentToDB(commentText, contentId);
            } else {
                alert("El comentario no puede estar vacío");
            }
        });
    }
}

export { addComment };