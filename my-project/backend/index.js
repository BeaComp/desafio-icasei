const express = require('express');
const app = express();
const videoRoutes = require('./routes/videos');

app.use('/api/videos', videoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});