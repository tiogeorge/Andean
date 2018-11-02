const imagen = require('../models/imagen');
const express = require('express');

const imagenController = {};



imagenController.subirImagen = async (req,res,next)=>{
    res.send("se subio con exito");
}
imagenController.descargarImagen = async (req,res,next)=>{

}
module.exports = imagenController;