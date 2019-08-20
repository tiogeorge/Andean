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
    console.log(req.body);
    var rutalg = './imagenes/lg'+req.body.ruta+'/'+req.body.carpeta;
    var rutamd = './imagenes/md'+req.body.ruta+'/'+req.body.carpeta;
    var rutasm = './imagenes/sm'+req.body.ruta+'/'+req.body.carpeta;
   // console.log(ruta);
    try {
        await fs.mkdir(rutalg, { recursive: true });
        await fs.mkdir(rutamd, { recursive: true });
        await fs.mkdir(rutasm, { recursive: true });
        res.json({
            estado:1,
            mensaje:'Exito.'
        });

      } catch (err) {
        if (err.code !== 'EEXIST') {
            res.json({
                estado:0,
                mensaje:'ERROR. El directorio ya existe.'
            });
        }
      }

    /*if (!fs.existsSync(ruta)){
        fs.mkdirSync(ruta);        
        
    }else{
        
    }*/
}

imagenController.subirImagen = function (req,res){
    
    var nombre = (req.file.originalname).split(" ").join("-");   
    var ruta = req.body.ruta;
    webp.cwebp(input+"/"+nombre,output_lg+""+ruta+"/"+nombre+".webp","-q 80",function(status,error)
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
                        webp.cwebp(input2+"/"+nombre,output_md+""+ruta+"/"+nombre+".webp","-q 80",function(status,error)
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
                                    webp.cwebp(input2+"/"+nombre,output_sm+""+ruta+"/"+nombre+".webp","-q 80",function(status,error)
                                    {
                                        if(error){
                                            console.log("ERROR al procesar las imagenes");
                                            console.log(error);
                                            res.json({
                                                estado: 0,
                                                mensaje:error
                                            });
                                        }else{
                                            console.log("EXITO AL PROCESAR LA IMAGEN");
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
           // console.log(f)
            listaimagenes.push(file);
        });
        res.json(listaimagenes);
      });
      
}
imagenController.getFiles = async (req,res)=>{
    try{
        console.log(req.body.nombre);
        var listaimagenes = new Array();
        fs.readdir('./imagenes/md'+req.body.nombre, (err, files) => {
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