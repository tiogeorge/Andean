const express = require('express');
const router = express.Router();

const articulo = require('../controllers/valoracion.controller');

router.get('/:id', articulo.obtenerValoracionesArticulo);
module.exports = router;