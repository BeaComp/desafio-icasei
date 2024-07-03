const request = require('supertest');
const express = require('express');

const controller = require('../controllers/controller');
const youtubeService = require('../server/server');

// Mock do youtubeService.search
jest.mock('../server/server', () => ({
    search: jest.fn()
}));

const app = express();

// Endpoint para testar searchVideos
app.get('/api/searchVideos', controller.searchVideos);

// Endpoint para testar addFavorite
app.post('/api/addFavorite', express.json(), controller.addFavorite);

// Endpoint para testar ListFavorite
app.get('/api/listFavorite', controller.ListFavorite);

describe('YouTube Service Tests', () => {
    test('GET /api/searchVideos should return videos for a given query', async () => {
        const mockVideos = [
            { id: { videoId: '12345' }, snippet: { title: 'Video 1' } },
            { id: { videoId: '67890' }, snippet: { title: 'Video 2' } }
        ];

        // Mock para youtubeService.search retornar os vídeos simulados
        youtubeService.search.mockResolvedValue(mockVideos);

        const response = await request(app)
            .get('/api/searchVideos')
            .query({ query: 'test query' });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockVideos);
    });

    test('POST /api/addFavorite should add or remove a video from favorites', async () => {
        const videoToAdd = { id: { videoId: '12345' }, snippet: { title: 'Video 1' } };

        // Adicionando o vídeo aos favoritos
        let response = await request(app)
            .post('/api/addFavorite')
            .send({ video: videoToAdd });

        expect(response.status).toBe(200);
        expect(response.body).toContainEqual(videoToAdd);

        // Verificando se o vídeo foi adicionado aos favoritos
        response = await request(app).get('/api/listFavorite');
        expect(response.body).toContainEqual(videoToAdd);

        // Removendo o vídeo dos favoritos
        response = await request(app)
            .post('/api/addFavorite')
            .send({ video: videoToAdd });

        expect(response.status).toBe(200);
        expect(response.body).not.toContainEqual(videoToAdd);

        // Verificando se o vídeo foi removido dos favoritos
        response = await request(app).get('/api/listFavorite');
        expect(response.body).not.toContainEqual(videoToAdd);
    });

    test('GET /api/listFavorite should return the list of favorite videos', async () => {
        const response = await request(app).get('/api/listFavorite');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
