// Función interna para crear el HTML del perfil
function createUserProfile(user) {
    return `
        <div class="user-profile">
            <div class="user-profile__header">
                <img class="user-profile__banner" 
                    src="http://localhost:8080/GAM/GetProfileImage?username=${user.username}&imageType=banner_image&t=${new Date().getTime()}" 
                    alt="Banner de ${user.username}">
                <div class="user-profile__profile">
                    <div class="user-profile__avatar">
                        <img src="http://localhost:8080/GAM/GetProfileImage?username=${user.username}&imageType=avatar_image&t=${new Date().getTime()}" 
                            alt="Avatar de ${user.username}">
                    </div>
                    <h2 class="user-profile__username">${user.username}</h2>
                </div>
                <button class="user-profile__close-btn">&times;</button>
            </div>
            
            <div class="user-profile__nav">
                <button class="user-profile__nav-btn user-profile__nav-btn--active" data-tab="info">Información</button>
                <button class="user-profile__nav-btn" data-tab="animes">Animes</button>
                <button class="user-profile__nav-btn" data-tab="mangas">Mangas</button>
            </div>

            <div class="user-profile__content">
                <section id="info-section" class="user-profile__section">
                    <div class="user-profile__info">
                        <div class="user-profile__details">
                            <h3>${user.username}</h3>
                            <p>ID: ${user.userId}</p>
                        </div>
                    </div>
                </section>

                <section id="animes-section" class="user-profile__section" style="display: none;">
                    <h3>Animes</h3>
                    <div class="user-profile__list">
                        ${user.animes.length > 0
            ? user.animes.map(anime => `
                                <div class="list-item">
                                    <div class="list-item__rating">
                                        <i class="bi bi-star-fill"></i>
                                        <span>${anime.rating || 'N/A'}</span>
                                    </div>
                                    <img class="item-image" src="${anime.images?.webp?.large_image_url || 'default-image.jpg'}" alt="${anime.title}">
                                    <div class="item-info">
                                        <h4>${anime.title_english || anime.title}</h4>
                                        <div class="item-details">
                                            <div class="detail">
                                                <i class="bi bi-star-fill"></i>
                                                <span>${anime.score || 'N/A'}</span>
                                            </div>
                                            <div class="detail">
                                                <i class="bi bi-film"></i>
                                                <span>${anime.episodes || 'N/A'} episodios</span>
                                            </div>
                                            <div class="detail">
                                                <i class="bi bi-tag"></i>
                                                <span>${anime.genres?.[0]?.name || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')
            : '<p>No hay animes en la lista</p>'
        }
                    </div>
                </section>

                <section id="mangas-section" class="user-profile__section" style="display: none;">
                    <h3>Mangas</h3>
                    <div class="user-profile__list">
                        ${user.mangas.length > 0
            ? user.mangas.map(manga => `
                                <div class="list-item">
                                    <div class="list-item__rating">
                                        <i class="bi bi-star-fill"></i>
                                        <span>${manga.rating || 'N/A'}</span>
                                    </div>
                                    <img class="item-image" src="${manga.images?.webp?.large_image_url || 'default-image.jpg'}" alt="${manga.title}">
                                    <div class="item-info">
                                        <h4>${manga.title_english || manga.title}</h4>
                                        <div class="item-details">
                                            <div class="detail">
                                                <i class="bi bi-star-fill"></i>
                                                <span>${manga.score || 'N/A'}</span>
                                            </div>
                                            <div class="detail">
                                                <i class="bi bi-book"></i>
                                                <span>${manga.chapters || 'N/A'} capítulos</span>
                                            </div>
                                            <div class="detail">
                                                <i class="bi bi-tag"></i>
                                                <span>${manga.genres?.[0]?.name || 'N/A'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `).join('')
            : '<p>No hay mangas en la lista</p>'
        }
                    </div>
                </section>
            </div>
        </div>
    `;
}

// Función interna para inicializar la navegación
function initUserProfile() {
    const navButtons = document.querySelectorAll('.user-profile__nav-btn');
    const sections = document.querySelectorAll('.user-profile__section');
    const closeBtn = document.querySelector('.user-profile__close-btn');

    closeBtn.addEventListener('click', () => {
        window.location.reload();
    });

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase activa de todos los botones
            navButtons.forEach(btn => btn.classList.remove('user-profile__nav-btn--active'));
            // Añadir clase activa al botón clickeado
            button.classList.add('user-profile__nav-btn--active');

            // Ocultar todas las secciones
            sections.forEach(section => section.style.display = 'none');
            // Mostrar la sección correspondiente
            const sectionId = `${button.dataset.tab}-section`;
            document.getElementById(sectionId).style.display = 'block';
        });
    });
}

export { createUserProfile, initUserProfile };