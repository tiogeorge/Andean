const imagen = require('../models/imagen');
const express = require('express');
const fs = require('fs');
const jimp = require('jimp');
//SDependencia para la compresion de la imagen
const imagemin = require('imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');
const input= './imagenes/tmp';
const input2= './imagenes/tmp2';
const output = './imagenes/compressed';
const output_sm = './imagenes/sm';
const output_md = './imagenes/md';
const output_lg = './imagenes/lg';
var webp=require('webp-converter');
const imagenController = {};




const imageCompressorRun = (input, output, plugins) => {
    return imagemin(input, output, { plugins : [
        mozjpeg({ speed: 3, quality: '80' }),
        pngquant({ speed: 3, quality: '80' })
    ]});
}
const compressorPluginsLG = [
    mozjpeg({ speed: 3, quality: '80' }),
    pngquant({ speed: 3, quality: '80' })
];
const compressorPluginsMD = [
    mozjpeg({ speed: 3, quality: '40' }),
    pngquant({ speed: 3, quality: '40' })
];
const compressorPluginsSM = [
    mozjpeg({ speed: 3, quality: '20' }),
    pngquant({ speed: 3, quality: '20' })
];


imagenController.crearCarpeta = async (req, res)=>{

    if (!fs.existsSync('./imagenes/'+req.body.carpeta)){
        fs.mkdirSync('./imagenes/'+req.body.carpeta);
        res.json({
            estado:1,
            mensaje:'Exito.'
        });
    }else{
        res.json({
            estado:0,
            mensaje:'ERROR. El directorio ya existe.'
        });
    }
}

imagenController.subirImagen = function (req,res){
    
    var nombre = (req.file.originalname).split(" ").join("-");   
    webp.cwebp(input+"/"+nombre,output_lg+"/"+nombre+".webp","-q 80",function(status,error)
    {
        if(error){
            console.log("Ocurrio un error al convertir a WEBP");
            res.json({
                estado: 0,
                mensaje:error
            });
        }else{
            jimp.read(input+"/"+nombre, function(err, image){
                if(err){
                    console.log("ERROR la abrir el archivo");
                    res.json({
                        estado: 0,
                        mensaje:err
                    });
                }else{
                    image.resize(jimp.AUTO, 250)
                    .quality(100)
                    .write(input2+"/"+nombre,()=>{
                        webp.cwebp(input2+"/"+nombre,output_md+"/"+nombre+".webp","-q 80",function(status,error)
                        {
                            if(error){
                                console.log("ERROR al procesar las imagenes");
                                console.log(error);
                                res.json({
                                    estado: 0,
                                    mensaje:error
                                });
                            }else{
                                image.resize(jimp.AUTO, 65)
                                .quality(100)
                                .write(input2+"/"+nombre, ()=>{
                                    webp.cwebp(input2+"/"+nombre,output_sm+"/"+nombre+".webp","-q 80",function(status,error)
                                    {
                                        if(error){
                                            console.log("ERROR al procesar las imagenes");
                                            console.log(error);
                                            res.json({
                                                estado: 0,
                                                mensaje:error
                                            });
                                        }else{
                                            res.json({
                                                estado: 1,
                                                mensaje:"Exito",
                                                imagen: nombre+".webp"
                                            });
                                        }
                                        
                                    });
                                });
                            }
                            
                        });
                    });
                }
            });

        }
    });
}
imagenController.getImagenes = async (req,res)=>{
    var listaimagenes = new Array();
    fs.readdir('./imagenes/lg', (err, files) => {
        files.forEach(file => {
            listaimagenes.push(file);
        });
        res.json(listaimagenes);
      });
      
}
imagenController.getFiles = async (req,res)=>{
    try{
        var listaimagenes = new Array();
        fs.readdir('./imagenes/tmp', (err, files) => {
            files.forEach(file => {
                listaimagenes.push(file);
            });
            res.json(listaimagenes);
        });
    }catch(err){
        console.log(err);
    }
      
}
imagenController.getListaArchivos = function(req,res){

}

module.exports = imagenController;