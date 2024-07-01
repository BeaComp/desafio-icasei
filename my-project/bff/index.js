const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
const videoRoutes = require('./routes/routes');

app.use('/api', videoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});