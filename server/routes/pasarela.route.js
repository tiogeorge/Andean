const express = require('express');
const router = express.Router();

const pasarela = require('../controllers/pasarela.controller')

router.post('/crearPago', pasarela.crearPago);

module.exports = router;