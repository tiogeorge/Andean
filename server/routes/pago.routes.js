const express = require('express');
const router = express.Router();

const pago= require('../controllers/pago.controller');

router.get('/',pago.listarpedidos);
router.get('/:id', pago.listarpedidouni);
router.post('/', pago.GuardarPago);
router.put('/:id', pago.actualizarpedido);
router.delete('/:id',pago.eliminarpedido);


module.exports = router;