const express = require('express');
const dividasController = require('../Controllers/dividasController');

var router = express.Router();

router.route('/:id').get(dividasController.getDivida);
router.route('').get(dividasController.getDividas);
router.route('/:id').delete(dividasController.deleteDivida);

module.exports = router;