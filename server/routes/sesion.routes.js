const express = require('express');
const router = express.Router();

const sesion = require('../controllers/sesion.controller');

router.get('/', sesion.obtenerSesion);
router.delete('/', sesion.limpiarSesion);

module.exports = router;