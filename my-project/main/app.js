window.addEventListener('message', (event) => {
    const mfDrawer = document.getElementById('mf_drawer').contentWindow;
    const mfVideos = document.getElementById('mf_videos').contentWindow;

    if (event.data.route === 'videos') {
        mfVideos.postMessage({ route: 'videos' }, '*');
    } else if (event.data.route === 'favorites') {
        mfVideos.postMessage({ route: 'favorites' }, '*');
    } else if (event.data.favoritesCount !== undefined) {
        mfDrawer.postMessage({ favoritesCount: event.data.favoritesCount }, '*');
    }
});
