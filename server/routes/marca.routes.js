const express = require('express');
const router =express.Router();

const marca=require('../controllers/marca.controller');
router.get('/',marca.obtenerMarcaMysql);

module.exports=router;