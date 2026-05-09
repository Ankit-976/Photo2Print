const express = require('express');
const cors = require('cors');
const photoRoutes = require('./routes/photoRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Update with your frontend URL
}));
app.use(express.json());
app.use('/api/photos', photoRoutes);



module.exports = app;