const express = require('express');
const router = express.Router();

const sesion = require('../controllers/sesion.controller');

router.get('/', sesion.obtenerSesion);
router.delete('/', sesion.limpiarSesion);
router.get('/admin', sesion.obtenerSesionAdmin);
router.delete('/admin', sesion.eliminarSesionAdmin);
//router.get('/admin/sesiones', sesion.obtenerSesiones);

module.exports = router;