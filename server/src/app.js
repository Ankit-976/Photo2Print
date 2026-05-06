const express = require('express');
const cors = require('cors');
const photoRoutes = require('./routes/photoRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/photos', photoRoutes);



module.exports = app;