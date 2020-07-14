const express = require('express');
const localidadesController = require('../Controllers/localidadesController');

var router = express.Router();

router.route('/:id').get(localidadesController.getLocalidade);
router.route('').get(localidadesController.getLocalidades);

module.exports = router;