const express = require('express');
const router = express.Router();

const caracteristica = require('../controllers/caracteristica.controller');

router.post('/', caracteristica.createCaracteristica);
router.get('/', caracteristica.getCaracteristicas);
router.put('/:id', caracteristica.putCaracteristica);
router.delete('/:id', caracteristica.deleteCaracteristica);

module.exports = router;