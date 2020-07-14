const express = require('express');
const mobileController = require('../Controllers/mobileController');

var router = express.Router();

router.route('/viagens/existentes').get(mobileController.getViagensExistentes);
router.route('/viagens/porfazer/:email').get(mobileController.getViagensPorFazer);
router.route('/motoristas/login').post(mobileController.postLoginMotoristas);
router.route('/clientes/login').post(mobileController.postLoginClientes);
router.route('/clientes/pedido').post(mobileController.postPedidoClientes);
router.route('/clientes/cancelar').post(mobileController.postPedidoCancelamento);
router.route('/clientes/divida').post(mobileController.postDivida);
router.route('/motoristas/viagens/:email').get(mobileController.getViagensMotoristas);
router.route('/clientes/viagens/:email').get(mobileController.getViagensClientes);
router.route('/viagens/realizadas/:email').get(mobileController.getViagensRealizadas);
router.route('/clientes/:email').get(mobileController.getClientePerfil);
router.route('/clientes/notificacoes/:email').get(mobileController.getNotificacoesClientes);
router.route('/clientes/notificacoes/:id').delete(mobileController.deleteNotificacoesClientes);
router.route('/motoristas/password/:email').put(mobileController.putPasswordMotoristas);
router.route('/clientes/password/:email').put(mobileController.putPasswordClientes);
router.route('/send/').post(mobileController.postEmailMobile);

module.exports = router;