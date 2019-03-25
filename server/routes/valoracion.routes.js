const express = require('express');
const router = express.Router();

const valoracion = require('../controllers/valoracion.controller');
router.get('/', valoracion.obtenerValoraciones);
router.get('/:idarticulo', valoracion.obtenerValoracionArticulo);
router.get('/promedio/:idarticulo', valoracion.promediovaloracion);
router.post('/', valoracion.crearValoracionArticulo);
router.get('/:idarticulo/:cliente', valoracion.obtenerValoracionArticuloCliente);
router.get('/:idarticulo/:cliente/:sin', valoracion.obtenerValoracionArticuloSinCliente);
router.put('/:idarticulo/:cliente', valoracion.actualizarValoracionArticuloCliente);
router.delete('/:idarticulo/:cliente', valoracion.eliminarValoracionArticuloCliente);
module.exports = router;