const express = require('express');
const router =express.Router();

const marca=require('../controllers/marca.controller');
router.get('/',marca.obtenerMarcaMysql);
router.get('/mdb', marca.obtenerMarcas);
router.get('/marc/:nombremarca',marca.listarmarca);
router.post('/',marca.crearMarca);

module.exports=router;