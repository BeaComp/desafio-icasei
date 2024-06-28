document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');

    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const url = link.getAttribute('href');
            fetchContent(url);
        });
    });

    async function fetchContent(url) {
        const response = await fetch(url);
        const html = await response.text();
        content.innerHTML = html;
    }
});
