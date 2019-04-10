const express = require('express');
const router = express.Router();

const pasarela = require('../controllers/pasarela.controller')

router.get('/', pasarela.listarCargos);
router.get('/devolucion', pasarela.listarDevoluciones);
router.get('/:id', pasarela.obtenerCargo);
router.post('/crearPago', pasarela.crearPago);
router.post('/devolucion', pasarela.devolverCargo);

module.exports = router;