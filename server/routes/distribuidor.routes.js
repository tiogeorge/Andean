const express= require('express');
const router = express.Router();

const distri=require('../controllers/distribuidor.controller');
router.get('/',distri.obtenerDistriMysql);

module.exports=router;