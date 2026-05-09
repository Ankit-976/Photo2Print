const express = require('express');
const cors = require('cors');
const photoRoutes = require('./routes/photoRoutes');

const app = express();

app.use(cors({
    origin: 'https://photo2-print.vercel.app/', // Update with your frontend URL
}));
app.use(express.json());
app.use('/api/photos', photoRoutes);



module.exports = app;