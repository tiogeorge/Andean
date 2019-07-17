const express = require('express');
const router = express.Router();
const auth = require('./auth');

const articulo = require('../controllers/articulo.controller');

router.get('/', auth.verificarTokenPublico,articulo.obtenerArticulosMysql);// solo admin?
router.get('/mongo/', auth.verificarTokenPrivado,articulo.listararticulos);
router.get('/cartel', auth.verificarTokenPublico,articulo.obtenerCards);
router.get('/carteles', auth.verificarTokenPublico ,articulo.obtenerCarteles);// LIBRE SMARKET
router.get('/bus/:categoriapadre',auth.verificarTokenPublico,articulo.busquedaGeneral);
router.get('/marcaart/:marca',auth.verificarTokenPublico,articulo.buscararti2);
router.get('/mn/:palabrasclaves',auth.verificarTokenPublico,articulo.buscararti);
router.get('/categoriaart/:categoria',auth.verificarTokenPublico,articulo.buscararti3);
router.get('/:id', auth.verificarTokenPublico,articulo.obtenerArticulo);
router.get('/url/:id',auth.verificarTokenPublico, articulo.obtenerArticuloURL);
router.get('/equipos/:idglobal/:opcion',auth.verificarTokenPublico, articulo.ObtenerEquiposArticulo);
router.get('/mysql/precios/:id',auth.verificarTokenPublico, articulo.obtenerPreciosMysql);
router.get('/card/card/card/:tipo',auth.verificarTokenPublico,articulo.obtenerCardsTipo);
router.get('/banners/banner', auth.verificarTokenPublico ,articulo.obtenerBanners); // LIBRE SMARKET
router.get('/banners/banners', auth.verificarTokenPublico,articulo.obtenerTodoBanners);
router.get('/banners/banner/:id',auth.verificarTokenPublico, articulo.obtenerArticulosBanner);

//router.get('/subcategorias/:id', articulo.obtenerSubCategorias);
router.post('/', auth.verificarTokenPrivado,articulo.crearArticulo);
router.post('/cartel', auth.verificarTokenPrivado, articulo.guardarCards);
router.post('/banner',  auth.verificarTokenPrivado,articulo.guardarBanners);
router.put('/:id', auth.verificarTokenPrivado, articulo.actualizarArticulo);
//router.delete('/:id', articulo.eliminarCategoria);
router.delete('/cartel/:id', auth.verificarTokenPrivado, articulo.eliminarCard);

module.exports = router;