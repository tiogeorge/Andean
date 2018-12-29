const express = require('express');
const router = express.Router();

const sesion = require('../controllers/sesion.controller');

router.post('/', sesion.crearSesion);

module.exports = router;