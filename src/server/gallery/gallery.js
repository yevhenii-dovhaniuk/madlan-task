const express = require('express');
const util = require('util');
const path = require('path');
const readdir = util.promisify(require('fs').readdir);
const router = express.Router();

router.use('/',  async (req, res) => {
    const imageNames = await readdir(path.join(__dirname, '../images'));
    const imageData = imageNames.map(imageName => {
        return {
            src: `/${imageName}`,
            title: imageName
        }
    });
    res.send(imageData);
});

module.exports = router;