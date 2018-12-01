const express = require('express');
const router = express.Router();

const articulo = require('../controllers/articulo.controller');

router.get('/', articulo.obtenerArticulosMysql);
//router.get('/:id', articulo.obtenerCategoria);
//router.get('/subcategorias/:id', articulo.obtenerSubCategorias);
router.post('/', articulo.crearArticulo);
router.put('/:id', articulo.actualizarArticulo);
//router.delete('/:id', articulo.eliminarCategoria);

module.exports = router;