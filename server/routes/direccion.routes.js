const express = require('express');
const router = express.Router();

const direccion = require('../controllers/direccion.controller');

router.post('/', direccion.createDireccion);
router.get('/', direccion.getDirecciones)

module.exports = router;