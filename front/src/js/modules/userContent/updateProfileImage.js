async function updateProfileImage(userToken, imageType, imageFile) {
    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();

        const formData = new FormData();
        formData.append('userToken', userToken);
        formData.append('imageType', imageType + '_image');
        formData.append('image', imageFile);

        http.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) {
                    resolve(http.responseText);
                } else {
                    reject(new Error('Error al obtener el contenido: ' + this.status));
                }
            }
        };

        http.open('POST', 'http://localhost:8080/GAM/UpdateProfileImage', true);
        http.send(formData);
    });
}

function getProfileImageUrl(userToken, imageType) {
    return `http://localhost:8080/GAM/GetProfileImage?userToken=${userToken}&imageType=${imageType}_image&t=${new Date().getTime()}`;
}

// Función para cargar las imágenes
function loadProfileImages() {
    const userToken = localStorage.getItem('authToken');
    const avatarImg = document.querySelector('.profile__logo-img');
    const bannerImg = document.querySelector('.profile__banner-img');
    const usernameElement = document.querySelector('.profile__name-text');

    // Actualizar el nombre de usuario
    if (usernameElement) {
        const username = localStorage.getItem('username');
        if (username) {
            usernameElement.textContent = username;
        }
    }

    if (avatarImg) {
        avatarImg.src = getProfileImageUrl(userToken, 'avatar');
    }

    if (bannerImg) {
        bannerImg.src = getProfileImageUrl(userToken, 'banner');
    }
}

// Función para actualizar las imágenes
function setImages() {
    // Cargar las imágenes al iniciar
    loadProfileImages();

    const avatarInput = document.querySelector('.profile__logo-input');
    const bannerInput = document.querySelector('.profile__banner-input');

    if (avatarInput) {
        avatarInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            const userToken = localStorage.getItem('authToken');

            if (file) {
                updateProfileImage(userToken, 'avatar', file)
                    .then(() => {
                        const avatarImg = document.querySelector('.profile__logo-img');
                        if (avatarImg) {
                            avatarImg.src = getProfileImageUrl(userToken, 'avatar');
                        }
                    })
                    .catch(error => {
                        alert('Error al actualizar la imagen de perfil: ' + error.message);
                    });
            }
        });
    }

    if (bannerInput) {
        bannerInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            const userToken = localStorage.getItem('authToken');

            if (file) {
                updateProfileImage(userToken, 'banner', file)
                    .then(() => {
                        const bannerImg = document.querySelector('.profile__banner-img');
                        if (bannerImg) {
                            bannerImg.src = getProfileImageUrl(userToken, 'banner');
                        }
                    })
                    .catch(error => {
                        alert('Error al actualizar la imagen de banner: ' + error.message);
                    });
            }
        });
    }
}

export { setImages, getProfileImageUrl };