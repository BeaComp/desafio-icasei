const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/search', videoController.searchVideos);
router.post('/favorite', videoController.addFavorite);
router.delete('/favorite', videoController.removeFavorite);

module.exports = router;