const express = require('express');
const estatisticasController = require('../Controllers/estatisticasController');

var router = express.Router();

router.route('/geral/viagens').get(estatisticasController.getGeralViagens);
router.route('/geral/motoristas').get(estatisticasController.getGeralMotoristas);
router.route('/geral/clientes').get(estatisticasController.getGeralClientes);
router.route('/geral/origemmenospopular').get(estatisticasController.getGeralOrigemMenosPopular);
router.route('/geral/destinomenospopular').get(estatisticasController.getGeralDestinoMenosPopular);
router.route('/geral/origemmaispopular').get(estatisticasController.getGeralOrigemMaisPopular);
router.route('/geral/destinomaispopular').get(estatisticasController.getGeralDestinoMaisPopular);

module.exports = router;