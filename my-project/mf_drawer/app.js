document.addEventListener('DOMContentLoaded', async function () {
    const videosLink = document.getElementById('videosLink');
    const favoritesLink = document.getElementById('favoritesLink');
    const favorites = await getFavorites();

    videosLink.addEventListener('click', () => {
        window.parent.postMessage({ route: 'videos' }, '*');
    });

    favoritesLink.addEventListener('click', () => {
        window.parent.postMessage({ route: 'favorites' }, '*');
    });

    if (favorites !== undefined && favorites.length > 0) {
        const countElementWeb = document.getElementById('favoritesCount-web');
        const countElementMobile = document.getElementById('favoritesCount-mobile');

        countElementWeb.textContent = favorites.length;
        countElementMobile.textContent = favorites.length;
    }

    window.addEventListener('message', (event) => {
        if (event.data.favoritesCount !== undefined) {
            const countElementWeb = document.getElementById('favoritesCount-web');
            const countElementMobile = document.getElementById('favoritesCount-mobile');

            countElementWeb.textContent = event.data.favoritesCount;
            countElementMobile.textContent = event.data.favoritesCount;
        }
    });
});

async function getFavorites() {
    try {
        const response = await fetch('http://localhost:3000/api/favorites');
        if (response.ok) {
            return await response.json();
        } else {
            console.error('Erro ao obter favoritos:', await response.text());
            return [];
        }
    } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
        return [];
    }
}