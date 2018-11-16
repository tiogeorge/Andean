const express = require('express');
const router = express.Router();

const categoria = require('../controllers/categoria.controller');

router.get('/', categoria.obtenerCategorias);
router.get('/:id', categoria.obtenerCategoria);
router.get('/subcategorias/:id', categoria.obtenerSubCategorias);
router.post('/', categoria.crearCategoria);
router.put('/:id', categoria.actualizarCategoria);
router.delete('/:id', categoria.eliminarCategoria);

module.exports = router;