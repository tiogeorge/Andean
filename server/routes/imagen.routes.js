const express = require('express');
const router = express.Router();
const multer = require('multer');


const imagen = require('../controllers/imagen.controller');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './imagenes/tmp')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname.split(" ").join("-"))
    }
});
var upload = multer({storage: storage});


router.get('/', imagen.getImagenes);
router.post('/files', imagen.getFiles);
router.post('/subir',upload.single('image'), imagen.subirImagen);
router.post('/crear-carpeta', imagen.crearCarpeta);

module.exports = router;