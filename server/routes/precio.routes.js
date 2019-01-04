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


router.get('/', precio.getPrecio);
router.get('/planes',precio.getPlanesEquipos);
router.get('/planesequipo/:id',precio.getPlanesEquipo);
router.post('/subir',upload.single('excel'), precio.subirExcel);
router.put('/plan/:id',precio.actualizarPlan);
router.put('/plan/del/:id', precio.eliminarPlan);


module.exports = router;