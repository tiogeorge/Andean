const express = require('express');
const router = express.Router();

const categoria = require('../controllers/categoria.controller');

router.get('/', categoria.obtenerCategorias);
router.get('/:id', categoria.obtenerCategoria);
router.post('/', categoria.crearCategoria);
router.put('/id', categoria.actualizarCategoria);

module.exports = router;