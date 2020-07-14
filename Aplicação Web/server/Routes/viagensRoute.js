const express = require('express');
const viagensController = require('../Controllers/viagensController');

var router = express.Router();

router.route('/viagem/:id').get(viagensController.getViagem);
router.route('').get(viagensController.getViagens);
router.route('/viagensrealizadas').get(viagensController.getViagensRealizadas);
router.route('').post(viagensController.postViagem);
router.route('/viagem/:id').delete(viagensController.deleteViagem);

module.exports = router;