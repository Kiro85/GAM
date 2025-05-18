import { logout, loginButtons } from './modules/login/login.js';
import { initAuth } from './modules/login/initAuth.js';
import { checkLoginStatus } from './modules/login/auth.js';
import { initContent } from './modules/apis/initContent.js';
import { addToCollection } from './modules/userContent/addUserContent.js';
import { removeFromCollection } from './modules/userContent/removeUserContent.js';
import { updateFromCollection } from './modules/userContent/updateUserContent.js';
import { getFriends } from './modules/userContent/getFriends.js';
import { initUserSearch } from './modules/userContent/searchUsers.js';
import { setImages } from './modules/userContent/updateProfileImage.js';
// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    loginButtons();
    initAuth();
    logout();
    checkLoginStatus();
    initContent();
    addToCollection();
    removeFromCollection()
    updateFromCollection();
    if (window.location.pathname.includes('friends.html')) {
        getFriends();
        initUserSearch();
    }
    if (window.location.pathname.includes('user.html')) {
        setImages();
    }
});