const express = require('express');
const router = express.Router();

const pasarela = require('../controllers/pasarela.controller')

router.post('/crearCargo', pasarela.crearCargo);

module.exports = router;