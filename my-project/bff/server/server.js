const axios = require('axios');

const YOUTUBE_API_KEY = 'AIzaSyAfsofkFrffuqWcgp1WT6tr8bm8Ic2XU1U';

exports.search = async (query) => {
  const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
          part: 'snippet',
          maxResults: 12,
          q: query,
          key: YOUTUBE_API_KEY
      }
  });
  return response.data.items;
};