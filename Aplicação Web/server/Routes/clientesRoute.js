const express = require('express');
const clienteController = require('../Controllers/clientesController');

var router = express.Router();

router.route('/:id').get(clienteController.getCliente);
router.route('').get(clienteController.getClientes);
router.route('').post(clienteController.postCliente);
router.route('/:id').put(clienteController.putCliente);
router.route('/:id').delete(clienteController.deleteCliente);

module.exports = router;