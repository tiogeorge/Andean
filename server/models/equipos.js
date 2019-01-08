const mongoose= require('mongoose');
const {Schema}=mongoose;    

const equipoSchema= new Schema({
    nombreequipo:{type:String, required: true},
    lineas:[
        {
            _id:false,
            tipo:{type:String, required: true},//PREPAGO O POSPAGO
            tipoplanes:[{
                _id:false,
                nombre:{type: String, required:true},// LINEA NUEVA, PORTABILIDAD (ESPECIAL), RENOVACION (ESPECIAL)
                cuotas:{type: Number, required: true}, //0, 12 o 18
                planes:[{
                    _id:false,
                    nombreplan:{type: String, required:true},// MAX INTERNACIONAL ......
                    precio:{type:Number, required: true},// PRECIO DEL PLAN
                    cuotainicial:{type:Number, required: false}// EN CASO DE CUOTAS

                }]
            }]
        }
    ]

});

module.exports= mongoose.model('EquipoPrecio',equipoSchema);