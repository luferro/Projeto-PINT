const express = require('express');
const viaturasController = require('../Controllers/viaturasController');

var router = express.Router();

router.route('/viatura/:id').get(viaturasController.getViatura);
router.route('').get(viaturasController.getViaturas);
router.route('/livres/:id').get(viaturasController.getViaturasLivres);
router.route('').post(viaturasController.postViatura);
router.route('/viatura/:id').put(viaturasController.putViatura);
router.route('/viatura/:id').delete(viaturasController.deleteViatura);

module.exports = router;