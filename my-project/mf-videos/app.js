document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const videosContainer = document.getElementById('videos');

    searchButton.addEventListener('click', async () => {
        const query = searchInput.value;
        const response = await fetch(`/api/videos/search?query=${query}`);
        const videos = await response.json();
        displayVideos(videos);
    });

    function displayVideos(videos) {
        videosContainer.innerHTML = '';
        videos.forEach(video => {
            const videoElement = document.createElement('div');
            videoElement.className = 'video';
            videoElement.innerHTML = `
          <h3>${video.snippet.title}</h3>
          <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
          <button class="favorite-button">⭐</button>
        `;
            videosContainer.appendChild(videoElement);
        });
    }
});
