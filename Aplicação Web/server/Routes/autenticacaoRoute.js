const express = require("express");
const router = express.Router();
const autorizar = require("../Middleware/autorizar");
const autenticacaoController = require('../Controllers/autenticacaoController');
    
router.route('/login').post(autenticacaoController.postLogin);
router.route('/verificar').get(autorizar, autenticacaoController.getVerificar);
router.route('/perfil/admin/:email').get(autenticacaoController.getPerfilAdmin);
router.route('/perfil/telefonista/:email').get(autenticacaoController.getPerfilTelefonista);
router.route('/perfil/presencial/:email').get(autenticacaoController.getPerfilPresencial);
router.route('/perfil/cmv/:email').get(autenticacaoController.getPerfilCMV);

module.exports = router;