const express = require('express');
const router = express.Router();

const articulo = require('../controllers/articulo.controller');

router.get('/', articulo.obtenerArticulosMysql);
router.get('/mongo/', articulo.listararticulos);
router.get('/mn/:titulo',articulo.buscararti);
router.get('/mar/:id',articulo.listarmarcas);
router.get('/:id', articulo.obtenerArticulo);
router.get('/url/:id', articulo.obtenerArticuloURL);
router.get('/mysql/precios/:id', articulo.obtenerPreciosMysql);
//router.get('/subcategorias/:id', articulo.obtenerSubCategorias);
router.post('/', articulo.crearArticulo);
router.put('/:id', articulo.actualizarArticulo);
//router.delete('/:id', articulo.eliminarCategoria);

module.exports = router;