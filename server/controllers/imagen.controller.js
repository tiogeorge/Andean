const imagen = require('../models/imagen');
const express = require('express');
const fs = require('fs');

//SDependencia para la compresion de la imagen
const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const input= './imagenes/tmp';
const output = './imagenes/compressed';
const output_sm = './imagenes/sm';
const output_md = './imagenes/md';
const output_lg = './imagenes/lg';





const imageCompressorRun = (input, output, plugins) => {
    return imagemin(input, output, { plugins });
}
const compressorPluginsLG = [
    mozjpeg({ speed: 1, quality: '60' }),
    pngquant({ speed: 1, quality: '60' })
];
const compressorPluginsMD = [
    mozjpeg({ speed: 3, quality: '40' }),
    pngquant({ speed: 3, quality: '40' })
];
const compressorPluginsSM = [
    mozjpeg({ speed: 3, quality: '20' }),
    pngquant({ speed: 3, quality: '20' })
];

const imagenController = {};



imagenController.subirImagen = function (req,res){
    console.log(req.file);
    
    //Comprimir imagen
    //imageCompressorRun([`${input}/*.{jpg,jpeg,png}`], output, compressorPlugins)
    imageCompressorRun([input+"/"+req.file.originalname], output_lg, compressorPluginsLG)
    .then(()=>{
        imageCompressorRun([input+"/"+req.file.originalname], output_md, compressorPluginsMD)
        .then(()=>{
            imageCompressorRun([input+"/"+req.file.originalname], output_sm, compressorPluginsSM)
            .then(()=>{
                console.log("Imagenes comprimidas");
                res.json({
                    estado:1,
                    mensaje:"Se comprimio la imagen correctamente"
                });
            });
        });
    });

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