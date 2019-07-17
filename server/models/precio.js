const mongoose= require('mongoose');
const {Schema}=mongoose;

const precioSchema= new Schema({
    idarticuloglobal:{type:String, required:true},
    descripcion:{type: String, required:true},
    preciocomprasinigv:{type:Number, required:true},
    precioventa:{type:Number, required:true},
    precioventaminimo:{type:Number, required:false},
    descuento:{type:Number, required:false}    

});

module.exports= mongoose.model('Precios',precioSchema);