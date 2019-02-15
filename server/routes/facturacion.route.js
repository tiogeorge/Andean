const express = require('express');
const router = express.Router();

const facturacion = require('../controllers/facturacion.controller');

router.get('/api', facturacion.getApi);
router.get('/documento/:idLocal/:tipoDoc/:serieDoc/:numeroDoc', facturacion.getDocumento);
router.get('/detalle/:tipoDoc/:serieDoc/:numeroDoc', facturacion.getDetalleDocumento);
router.get('/nombrecliente/:idCliente', facturacion.getNombreCliente);
router.post('/xmlqr', facturacion.xmlqr);

module.exports = router;