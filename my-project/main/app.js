window.addEventListener('message', function(event) {
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

// Captura o elemento do mf_drawer
const drawerElement = document.getElementById('div-mf_drawer');

// Função para verificar espaço e aplicar classes responsivas
function adjustDrawerLayout() {
    const drawerWidth = drawerElement.offsetWidth;
    const buttons = drawerElement.querySelectorAll('.round-button');

    const isResponsive = drawerWidth <= 200; // Defina o limite de largura para mudar para responsivo

    buttons.forEach(function(button) {
        if (isResponsive) {
            button.classList.add('responsive-button');
        } else {
            button.classList.remove('responsive-button');
        }
    });
}

// Chama a função inicialmente e adiciona um listener para o evento resize
adjustDrawerLayout();
window.addEventListener('resize', adjustDrawerLayout);
