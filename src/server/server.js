const express = require('express');
const gallery = require('./gallery/gallery');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../ui/static')));
app.use(express.static(path.join(__dirname, 'images')));
app.use('/gallery', gallery);

app.listen(3000, () => console.log('Server listening on http://localhost:3000'));