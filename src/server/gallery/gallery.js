const express = require('express');
const util = require('util');
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);
const router = express.Router();

const imageExtensions = ['jpg', 'jpeg', 'svg', 'png', 'gif'];

router.get('/', async (req, res) => {
    const imageNames = await readdir(path.join(__dirname, '../images'));
    const imageData = imageNames.reduce((acc, imageName) => {
        const extension = imageName.split('.').pop();
        if (imageExtensions.includes(extension)) {
            acc.images.push({
                src: `/${imageName}`,
                title: imageName
            });
            acc.total++;
        }
        return acc;
    }, {total: 0, images: []});
    res.send(imageData);
});

router.post('/', async (req, res) => {
    const form = formidable.IncomingForm();
    form.parse(req);
    form.on('fileBegin', (name, file) => {
        file.path = __dirname + '/../images/' + file.name;
    });

    form.on('file', () => {
        res.send('uploaded')
    });

    form.on('error', (e) => {
        console.log('File parsing failed with error', e);
        res.status(500);
        res.send(`Problem with file upload: ${e.message}`);
    });
});

module.exports = router;