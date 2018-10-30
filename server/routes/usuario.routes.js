const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.crearUsuario);
router.post('/login',usuario.loginUsuario);

module.exports = router;