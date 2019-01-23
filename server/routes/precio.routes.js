const express = require('express');
const router = express.Router();
const multer = require('multer');
const precio = require('../controllers/precio.controller');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './excel')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
});
var upload = multer({storage: storage});


router.get('/', precio.getListaPrecios);
//router.get('/planes',precio.getPlanesEquipos);
router.get('/planesequipo/:id', precio.getPreciosEquipo);
router.get('/planesequipo/:id/:linea/:tipoplan/:cuotas',precio.getPlanesEquipo);
router.get('/planeq/:nombre',precio.listarplanesequipo);
router.get('/plan', precio.getPlanes);
router.get('/plan/:id', precio.getDetallePlan);
router.post('/subir',upload.single('excel'), precio.subirExcel);
router.put('/plan/:id',precio.actualizarPlan);
router.delete('/plan/del/:id', precio.eliminarPlan);


module.exports = router;