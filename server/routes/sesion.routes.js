const express = require('express');
const auth = require('./auth');
const router = express.Router();

const sesion = require('../controllers/sesion.controller');

router.get('/', sesion.obtenerSesion);
router.post('/gt',auth.generarTokenPublico);
router.post('/newsessiontoken',auth.generarNuevoTokenPrivado);
router.delete('/', sesion.limpiarSesion);
router.get('/admin', sesion.obtenerSesionAdmin);
router.delete('/admin', sesion.eliminarSesionAdmin);
router.get('/notificaciones', sesion.getNotificaciones);

module.exports = router;