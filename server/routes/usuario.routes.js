const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.crearUsuario);
router.post('/login', usuario.loginUsuario);
router.post('/adminLogin', usuario.loginAdmin);
router.post('/envio', usuario.guardarEnvio);
router.get('/', usuario.listarUsuarios);
router.get('/user/:id',usuario.usuarioid);
router.put('/:id',usuario.actualizarUsuario);
router.get('/carrito', usuario.obtenerCarrito);
router.put('/carrito/:url', usuario.agregarArticulo);
router.get('/cliente',usuario.obtenerUsuario);
router.delete('/carrito', usuario.eliminarTodoArticulos);
router.delete('/carrito/:url',usuario.eliminarArticulo);

module.exports = router;