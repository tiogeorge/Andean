const express = require('express');
const router = express.Router();

const categoria = require('../controllers/categoria.controller');

router.get('/', categoria.obtenerCategorias);
router.get('/subs', categoria.obtenerTodosHijos);
router.get('/:id', categoria.obtenerCategoria);
router.get('/padre/padre/:id',categoria.obtenerCategoriapadresegunhijo);
router.get('/categoriapadre/:padre',categoria.obtenerCategoriapadre);
router.get('/catpadre/:id',categoria.obtenerpadreehijos);
router.get('/subcategorias/:id', categoria.obtenerSubCategorias);
router.get('/categoriaart/:descripcion',categoria.listarcategoria);
router.post('/', categoria.crearCategoria);
router.put('/:id', categoria.actualizarCategoria);
router.delete('/:id', categoria.eliminarCategoria);

module.exports = router;