const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.crearUsuario);
router.post('/login', usuario.loginUsuario);
router.post('/adminLogin', usuario.loginAdmin);
router.get('/', usuario.listarUsuarios);
router.put('/:id',usuario.actualizarUsuario);
router.put('/carrito/:url', usuario.agregarArticulo);
router.get('/cliente',usuario.obtenerUsuario);
router.delete('/carrito', usuario.eliminarTodoArticulos);
router.delete('/carrito/:url/:token',usuario.eliminarArticulo);

module.exports = router;