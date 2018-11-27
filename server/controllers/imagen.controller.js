const imagen = require('../models/imagen');
const express = require('express');
const fs = require('fs');

//SDependencia para la compresion de la imagen
const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const input= './imagenes/tmp';
const output = './imagenes/compressed';






const imageCompressorRun = (input, output, plugins) => {
    return imagemin(input, output, { plugins });
}
const compressorPlugins = [
    mozjpeg({ speed: 1, quality: '50' }),
    pngquant({ speed: 1, quality: '50' })
];


const imagenController = {};



imagenController.subirImagen = function (req,res){

    res.json({
        estado: 1 ,
        mensaje: 'Imagen subida'
      });
    //Comprimir imagen
    /*imageCompressorRun([`${input}/*.{jpg,jpeg,png}`], output, compressorPlugins)
    .then(()=>{
        console.log("se comprimio correctamente");
        res.json({
            exito: true,
            msg: 'Imagen subida y comprimida'
          });
    });*/

}
imagenController.getImagenes = async (req,res)=>{
    var listaimagenes = new Array();
    fs.readdir('./imagenes/tmp', (err, files) => {
        files.forEach(file => {
            listaimagenes.push(file);
        });
        res.json(listaimagenes);
      });
      
}
module.exports = imagenController;