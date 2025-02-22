const express = require('express');
const router = express.Router();
const videoController = require('../controllers/controller');

router.get('/search', videoController.searchVideos);
router.get('/favorites', videoController.ListFavorite);
router.post('/favorite', videoController.addFavorite);

module.exports = router;