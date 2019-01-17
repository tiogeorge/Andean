const mongoose= require('mongoose');
const {Schema}=mongoose;    

const equipoSchema= new Schema({
    nombreequipo:{type:String, required: true},
    planes:[
        {
            _id:false,
            tipolinea:{type:String, required: true},//PREPAGO O POSPAGO
            tipoplan:{type:String, required: true},// LINEA NUEVA PORTABILIDAD O RENOVACION/ESPECIAL
            nombreplan:{type: String, required: true},
            precio:{type:Number, required: true},// PRECIO DEL PLAN
            cuotas:{type: Number, required: true}, //0, 12 o 18
            cuotainicial:{type:Number, required: false},// EN CASO DE CUOTAS            
            montomes:{type: Number, required: false},
            cuotamesual:{type:Number, required: false}
            
        }
    ]

});

module.exports= mongoose.model('EquipoPrecio',equipoSchema);