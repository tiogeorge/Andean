const express = require('express');
const router = express.Router();

const region = require('../controllers/region.controller');

router.post('/', region.createRegion);

module.exports = router;