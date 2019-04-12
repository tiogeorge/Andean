const express = require('express');
const router = express.Router();

const articulo = require('../controllers/articulo.controller');

router.get('/', articulo.obtenerArticulosMysql);
router.get('/mongo/', articulo.listararticulos);
router.get('/cartel', articulo.obtenerCards);
router.get('/carteles', articulo.obtenerCarteles);
router.get('/bus/:categoriapadre/:linea/:tipoplan/:cuotas',articulo.busquedaGeneral);
router.get('/marcaart/:marca/:linea/:tipoplan/:cuotas',articulo.buscararti2);
router.get('/mn/:palabrasclaves/:linea/:tipoplan/:cuotas',articulo.buscararti);
router.get('/categoriaart/:categoria/:linea/:tipoplan/:cuotas',articulo.buscararti3);
router.get('/:id', articulo.obtenerArticulo);
router.get('/url/:id', articulo.obtenerArticuloURL);
router.get('/equipos/:idglobal', articulo.ObtenerEquiposArticulo);
router.get('/mysql/precios/:id', articulo.obtenerPreciosMysql);
router.get('/card/card/card/:tipo',articulo.obtenerCardsTipo);
router.get('/banners/banner', articulo.obtenerBanners);
router.get('/banners/banners', articulo.obtenerTodoBanners);
router.get('/banners/banner/:id/:linea/:tipoplan/:cuotas', articulo.obtenerArticulosBanner);

//router.get('/subcategorias/:id', articulo.obtenerSubCategorias);
router.post('/', articulo.crearArticulo);
router.post('/cartel', articulo.guardarCards);
router.post('/banner', articulo.guardarBanners);
router.put('/:id', articulo.actualizarArticulo);
//router.delete('/:id', articulo.eliminarCategoria);
router.delete('/cartel/:id', articulo.eliminarCard);

module.exports = router;