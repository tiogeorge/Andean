const express = require('express');
const router = express.Router();

const articulo = require('../controllers/articulo.controller');

router.get('/', articulo.obtenerArticulosMysql);
router.get('/mongo/', articulo.listararticulos);
router.get('/cartel', articulo.obtenerCards);
router.get('/marcaart/:marca/:linea/:tipoplan/:cuotas',articulo.buscararti2);
router.get('/mn/:titulo/:linea/:tipoplan/:cuotas',articulo.buscararti);
router.get('/categoriaart/:categoria/:linea/:tipoplan/:cuotas',articulo.buscararti3);
router.get('/:id', articulo.obtenerArticulo);
router.get('/url/:id', articulo.obtenerArticuloURL);
router.get('/equipos/:idglobal', articulo.ObtenerEquiposArticulo);
router.get('/mysql/precios/:id', articulo.obtenerPreciosMysql);
//router.get('/subcategorias/:id', articulo.obtenerSubCategorias);
router.post('/', articulo.crearArticulo);
router.post('/cartel', articulo.guardarCards);
router.put('/:id', articulo.actualizarArticulo);
//router.delete('/:id', articulo.eliminarCategoria);

module.exports = router;