const express = require('express');
const router = express.Router();
const multer = require('multer');

var upload = multer({ dest: 'uploads/' })
const imagen = require('../controllers/imagen.controller');

router.get('/', imagen.descargarImagen);
router.post('/', upload.single('filename'),imagen.subirImagen);

module.exports = router;