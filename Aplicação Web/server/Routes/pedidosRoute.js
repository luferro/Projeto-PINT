const express = require('express');
const pedidosController = require('../Controllers/pedidosController');

var router = express.Router();

router.route('/pedido/:id').get(pedidosController.getPedido);
router.route('').get(pedidosController.getPedidos);
router.route('/pedidoshoje').get(pedidosController.getPedidosHoje);
router.route('').post(pedidosController.postPedido);
router.route('/pedido/:id').put(pedidosController.putPedido);
router.route('/pedido/:id').delete(pedidosController.deletePedido);

module.exports = router;