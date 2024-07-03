// search.test.js

const axios = require('axios');
const { search } = require('./server');

// Mock do Axios para simular a requisição à API do YouTube
jest.mock('axios');

describe('YouTube Search API', () => {
    test('Search function should return videos for a given query', async () => {
        // Dados simulados de resposta da API do YouTube
        const mockResponse = {
            data: {
                items: [
                    { id: { videoId: '12345' }, snippet: { title: 'Video 1' } },
                    { id: { videoId: '67890' }, snippet: { title: 'Video 2' } }
                ]
            }
        };

        // Configura o mock do Axios para retornar os dados simulados
        axios.get.mockResolvedValue(mockResponse);

        // Termo de pesquisa para o teste
        const query = 'test query';

        // Chama a função search com o termo de pesquisa
        const videos = await search(query);

        // Verifica se a função search retornou os dados esperados
        expect(videos).toHaveLength(2);
        expect(videos[0].id.videoId).toEqual('12345');
        expect(videos[1].id.videoId).toEqual('67890');
    });
});
