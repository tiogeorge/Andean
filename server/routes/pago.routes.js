const express = require('express');
const router = express.Router();

const pago= require('../controllers/pago.controller');

router.get('/',pago.listarpedidos);
router.post('/', pago.GuardarPago);


module.exports = router;