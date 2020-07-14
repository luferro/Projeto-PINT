const express = require('express');
const emailController = require('../Controllers/emailController');

var router = express.Router();

router.route('/email').post(emailController.postEmail);
router.route('/emails').post(emailController.postEmails);

module.exports = router;