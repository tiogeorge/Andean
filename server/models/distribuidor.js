const mongoose = require('mongoose');
const {Schema}=mongoose;

const distribuidorSchema = new Schema({
    idProveedorRUC:{type:String, required: true},
    RazonSocial:{type:String, required:true},
    NombreRepresentante:{type:String,required:true},
    DNIRepresentante:{type:String,required:true},
    Telefono:{type:String},
    CorreoElectronico:{type:String},
    Web:{type:String},
    Ciudad:{type:String,required:true},
    Direccion:{type:String,required:true},
});

module.exports=mongoose.model('Distribuidor',distribuidorSchema);