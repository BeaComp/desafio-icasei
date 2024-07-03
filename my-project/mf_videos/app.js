document.addEventListener('DOMContentLoaded', async function () {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const videosList = document.getElementById('video-list');

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = searchInput.value;
        try {
            const videos = await searchVideos(query);
            renderVideos(videos);
        } catch (error) {
            console.error('Erro ao buscar vídeos:', error);
        }
    });

    window.addEventListener('message', async function (event) {
        if (event.data.route === 'videos') {
            document.querySelector('.input').style.display = 'flex';
            document.querySelector('.title-container').style.display = 'none';
            const videos = await searchVideos('');
            renderVideos(videos);
        } else if (event.data.route === 'favorites') {
            document.querySelector('.input').style.display = 'none';
            document.querySelector('.title-container').style.display = 'block';
            renderFavoriteVideos();
        }
    });

    async function searchVideos(query) {
        const response = await fetch('http://localhost:3000/api/search?query=${query}');
        if (!response.ok) {
            throw new Error(`Erro ao buscar vídeos: ${response.statusText}`);
        }
        return await response.json();
    }

    function renderVideos(videos) {
        videosList.innerHTML = '';
        videos.forEach(video => {
            const videoElement = createVideoElement(video);
            videosList.appendChild(videoElement);
        });
    }

    function createVideoElement(video) {
        const videoElement = document.createElement('div');
        videoElement.className = 'video-item';
        videoElement.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${video.id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <button class="favorite-btn" data-id="${video.id.videoId}">
                <span>
                    <img src="./media/estrela.png" class="star-icon" alt="Estrela">
                </span>
            </button>
        `;
        const favoriteButton = videoElement.querySelector('.favorite-btn');
        manageFavoriteButtonState(favoriteButton, video);
        favoriteButton.addEventListener('click', async () => {
            await toggleFavorite(video, favoriteButton);
        });
        return videoElement;
    }

    async function toggleFavorite(video, button) {
        try {
            const response = await fetch('http://localhost:3000/api/favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ video })
            });

            if (!response.ok) {
                throw new Error(`Erro ao favoritar o vídeo: ${response.statusText}`);
            }

            const favorites = await getFavorites();
            updateFavoriteIcon(button, video, favorites);
            const favoritesCount = favorites.length;
            window.parent.postMessage({ favoritesCount }, '*');
        } catch (error) {
            console.error('Erro ao favoritar o vídeo:', error);
        }
    }

    async function getFavorites() {
        try {
            const response = await fetch('http://localhost:3000/api/favorites');
            if (!response.ok) {
                throw new Error(`Erro ao obter favoritos: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro ao obter favoritos:', error);
            return [];
        }
    }

    async function renderFavoriteVideos() {
        try {
            const favorites = await getFavorites();
            videosList.innerHTML = '';
            favorites.forEach(video => {
                const videoElement = createVideoElement(video);
                videosList.appendChild(videoElement);
            });
        } catch (error) {
            console.error('Erro ao renderizar vídeos favoritos:', error);
        }
    }

    async function manageFavoriteButtonState(button, video) {
        try {
            const favorites = await getFavorites();
            updateFavoriteIcon(button, video, favorites);
        } catch (error) {
            console.error('Erro ao gerenciar estado do botão de favorito:', error);
        }
    }

    function updateFavoriteIcon(button, video, favorites) {
        const isFavorite = favorites.some(fav => fav.id.videoId === video.id.videoId);
        const starIcon = button.querySelector('.star-icon');
        starIcon.src = isFavorite ? './media/estrela_preenchida.png' : './media/estrela.png';
    }
});