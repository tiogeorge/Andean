const express = require('express');
const router = express.Router();

const direccion = require('../controllers/direccion.controller');

router.post('/', direccion.createDireccion);
router.get('/:id', direccion.getDirecciones);
router.put('/:id', direccion.putDireccion);
router.delete('/:id',direccion.deleteDireccion);

module.exports = router;