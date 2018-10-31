const imagen = require('../models/imagen');
const express = require('express');
const multer = require('multer');

const imagenController = {};

var upload = multer({ dest: 'uploads/' })

imagenController.subirImagen = async (req,res,next)=>{
    console.log(req.file);
}
imagenController.descargarImagen = async (req,res,next)=>{

}
module.exports = imagenController;