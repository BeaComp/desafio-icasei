const axios = require('axios');

const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';

exports.search = async (query) => {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            q: query,
            key: YOUTUBE_API_KEY
        }
    });
    return response.data.items;
};