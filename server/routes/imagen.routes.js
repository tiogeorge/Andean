const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      
     const dir='./imagenes/nuevoarticulo';
      //fs.mkdir(dir, err => cb(err, dir))
      cb(null, dir)
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toDateString()+"-"+file.originalname);
    }
  })
   
var upload = multer({ storage: storage })
const imagen = require('../controllers/imagen.controller');

router.post('/subir', upload.single('filename'),imagen.subirImagen);

module.exports = router;