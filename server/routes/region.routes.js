const express = require('express');
const router = express.Router();

const region = require('../controllers/region.controller');

router.post('/', region.createRegion);
router.get('/', region.getRegiones);
router.put('/:id',region.putRegion);

module.exports = router;