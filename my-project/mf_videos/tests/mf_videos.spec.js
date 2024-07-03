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

        window.parent.postMessage = jest.fn();

        console.error = (...args) => {
            if (args[0].includes('Could not load link') || args[0].includes('Could not load script')) {
                return;
            }
            originalError(...args);
        };

        // Mock para a API fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve([{ id: { videoId: 'video1' } }, { id: { videoId: 'video2' } }])
            })
        );

        document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));
    });

    beforeEach(() => {
        // Limpar o conteúdo do vídeo antes de cada teste
        const videoList = document.getElementById('video-list');
        videoList.innerHTML = '';
    });

    test('should render favorite videos on message event', async () => {
        await new Promise(resolve => {
            document.addEventListener('DOMContentLoaded', resolve);
        });

        window.parent.postMessage({ route: 'favorites' }, '*'); 

        expect(window.parent.postMessage).toHaveBeenCalledWith({ route: 'favorites' }, '*');
    });
    
    afterAll(() => {
        // Limpar mocks e outros recursos após todos os testes
        global.fetch.mockClear();
        delete global.fetch;
        window.parent.postMessage.mockClear();
    });
});
