const youtubeService = require('../services/youtubeService');

exports.searchVideos = async (req, res) => {
    const { query } = req.query;
    try {
        const videos = await youtubeService.search(query);
        res.json(videos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.addFavorite = (req, res) => {
    // Implementar lógica para adicionar aos favoritos
};

exports.removeFavorite = (req, res) => {
    // Implementar lógica para remover dos favoritos
};