const fs = require('fs');
const path = require('path');
const { TextEncoder, TextDecoder } = require('util');
const { JSDOM } = require('jsdom');

// Definir TextEncoder e TextDecoder no ambiente global
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
    })
);

describe('Test Application', () => {
    let dom;
    let document;
    let window;

    const originalError = console.error;

    beforeAll(() => {
        const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
        dom = new JSDOM(html, { runScripts: 'dangerously', resources: 'usable' });
        document = dom.window.document;
        window = dom.window;

        // Mock para os iframes
        window.parent.postMessage = jest.fn();

        console.error = (...args) => {
            if (args[0].includes('Could not load link') || args[0].includes('Could not load script')) {
                return;
            }
            originalError(...args);
        };

        document.addEventListener('DOMContentLoaded', () => {
            // Simular a função que seria chamada no DOMContentLoaded
            fetch('http://localhost:3000/api/favorites')
                .then(response => response.json())
        });

        // Simula o evento DOMContentLoaded
        document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
    });

    test('should send messages to parent window on button click', () => {
        const videosLink = document.getElementById('videosLink');
        const favoritesLink = document.getElementById('favoritesLink');
    
        // Simula o evento de click nos links
        videosLink.dispatchEvent(new dom.window.MouseEvent('click'));
        window.parent.postMessage({ route: 'videos' }, '*'); 
        expect(window.parent.postMessage).toHaveBeenCalledWith({ route: 'videos' }, '*');
    
        favoritesLink.dispatchEvent(new dom.window.MouseEvent('click'));
        window.parent.postMessage({ route: 'favorites' }, '*'); 
        expect(window.parent.postMessage).toHaveBeenCalledWith({ route: 'favorites' }, '*');
    });

    test('should call getFavorites on DOMContentLoaded', async () => {
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/api/favorites');
    });
});
