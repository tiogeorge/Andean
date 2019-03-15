const mongoose = require('mongoose');
const { Schema } = mongoose;  
const BannerSchema = new Schema({
    imagen: {type: String, required: true},
    articulos:[
        {
            idarticulo:{type: String, required:true},
            url:{type:String,required: true},
            titulo:{type: String, required:true},
            categoria:{type: String, required:true},
            idprecio:{type:String, required:true},
            cantidad:{type:Number, required:true},
            imagenes: [String],
            precioplan:{
                tipolinea:{type:String, required: true},//PREPAGO O POSPAGO
                tipoplan:{type:String, required: true},// LINEA NUEVA PORTABILIDAD O RENOVACION/ESPECIAL
                nombreplan:{type: String, required: true},
                precio:{type:Number, required: true},// PRECIO DEL PLAN
                cuotas:{type: Number, required: true}, //0, 12 o 18
                cuotainicial:{type:Number, required: false},// EN CASO DE CUOTAS            
                montomes:{type: Number, required: false},
                cuotamensual:{type:Number, required: false}
            }


        }
    ]
});
module.exports = mongoose.model('Banner', BannerSchema);