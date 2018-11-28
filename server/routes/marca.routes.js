const express = require('express');
const router =express.Router();

const marca=require('../controllers/marca.controller');
router.get('/',marca.obtenerMarcaMysql);
router.post('/',marca.crearMarca);

module.exports=router;