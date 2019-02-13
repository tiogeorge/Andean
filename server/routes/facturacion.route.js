const express = require('express');
const router = express.Router();

const facturacion = require('../controllers/facturacion.controller');

router.get('/api', facturacion.getApi);

module.exports = router;