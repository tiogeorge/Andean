const express = require('express');
const router = express.Router();

const pago= require('../controllers/pago.controller');

router.get('/',pago.listarpedidos);
router.get('/:id', pago.listarpedidouni);
router.get('/serielocal/serie',pago.recuperarseriedoc);
router.get('/numerodoc/numero',pago.ultimonumeroemitido);
router.get('/artic/series/:idarti',pago.recuperarseriesequipos);
router.get('consul/ped/:num',pago.consultarnropedido);
router.post('/', pago.GuardarPago);
router.post('/pagomysql/',pago.guardarpagomysql);
router.post('/detalle/',pago.guardardetallemysql);
router.put('/:id', pago.actualizarpedido);
router.delete('/:id',pago.eliminarpedido);


module.exports = router;