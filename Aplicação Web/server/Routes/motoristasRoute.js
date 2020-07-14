const express = require('express');
const motoristaController = require('../Controllers/motoristasController');

var router = express.Router();

router.route('/motorista/:id').get(motoristaController.getMotorista);
router.route('').get(motoristaController.getMotoristas);
router.route('/livres/:id').get(motoristaController.getMotoristasLivres);
router.route('').post(motoristaController.postMotorista);
router.route('/motorista/:id').put(motoristaController.putMotorista);
router.route('/motorista/:id').delete(motoristaController.deleteMotorista);

module.exports = router;