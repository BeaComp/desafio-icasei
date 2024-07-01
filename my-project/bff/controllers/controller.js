const youtubeService = require('../server/server');
const favorites = [];

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
    const { video } = req.body;
    const index = favorites.findIndex(fav => fav.id.videoId === video.id.videoId);
    if (index >= 0) {
        favorites.splice(index, 1);
    } else {
        favorites.push(video);
    }
    res.json(favorites);
};

exports.ListFavorite = (req, res) => {
    res.json(favorites);
};

exports.removeFavorite = (req, res) => {
    // Implementar lógica para remover dos favoritos
};