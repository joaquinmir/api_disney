const express = require('express');
const router = express.Router();
const Movie = require('../database/models/Movie');
const Genre = require('../database/models/Genre');
require('../database/associations');

router.post('/', (req, res) => {
    Genre.create({
        name: req.body.name,
        img: req.body.img
    }).catch(err=>console.log(err))
})

module.exports = router;