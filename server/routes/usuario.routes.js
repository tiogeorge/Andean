const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.crearUsuario);
router.post('/login', usuario.loginUsuario);
router.post('/adminLogin', usuario.loginAdmin);
router.get('/', usuario.listarUsuarios);
router.put('/:id',usuario.actualizarUsuario);
router.get('/:id',usuario.obtenerUsuario);
//router.delete('/:id',usuario.eliminarUsuario);

module.exports = router;