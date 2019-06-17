const express = require('express');
const router = express.Router();
const auth = require('./auth');
const usuario = require('../controllers/usuario.controller');

router.post('/', usuario.crearUsuario);
router.post('/login', usuario.loginUsuario);
router.post('/adminLogin', usuario.loginAdmin);
router.post('/envio', usuario.guardarEnvio);
router.post('/recuperar', usuario.recuperarContraseña);
router.get('/', usuario.listarUsuarios);
router.get('/user/:id',usuario.usuarioid);
router.get('/carrito',auth.verificarTokenPrivado, usuario.obtenerCarrito);
router.get('/cliente',auth.verificarTokenPrivado, usuario.obtenerUsuario);
router.get('/datoscliente',auth.verificarTokenPrivado, usuario.obtenerDatosUsuario);
router.get('/clien/doc/:id',usuario.obtenerDocUsuario);
router.put('/cambiar', usuario.cambiarPassword);
router.put('/carrito/:id', auth.verificarTokenPrivado,usuario.agregarArticulo);
router.put('/:id',usuario.actualizarUsuario);
router.delete('/carrito',auth.verificarTokenPrivado, usuario.eliminarTodoArticulos);
router.delete('/carrito/:id',auth.verificarTokenPrivado,usuario.eliminarArticulo);

module.exports = router;