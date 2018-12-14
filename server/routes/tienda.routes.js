const expres = require('express');
const router = expres.Router();

const tienda = require('../controllers/tienda.controller');

//router.post('/', usuario.crearUsuario);
router.post('/', tienda.createTienda);
router.get('/', tienda.getTiendas);
router.put('/:id', tienda.putTienda);
router.delete('/:id', tienda.deleteTienda);

module.exports = router;