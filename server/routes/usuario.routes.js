const express = require('express');
const router = express.Router();

const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.crearUsuario);
router.post('/login', usuario.loginUsuario);
router.post('/adminLogin', usuario.loginAdmin);
router.post('/envio', usuario.guardarEnvio);
router.post('/recuperar', usuario.recuperarContraseña);
router.get('/', usuario.listarUsuarios);
router.get('/user/:id',usuario.usuarioid);
router.get('/carrito', usuario.obtenerCarrito);
router.get('/cliente',usuario.obtenerUsuario);
router.get('/clien/doc/:id',usuario.obtenerDocUsuario);
router.put('/cambiar', usuario.cambiarPassword);
router.put('/carrito/:id', usuario.agregarArticulo);
router.put('/:id',usuario.actualizarUsuario);
router.delete('/carrito', usuario.eliminarTodoArticulos);
router.delete('/carrito/:url',usuario.eliminarArticulo);

module.exports = router;