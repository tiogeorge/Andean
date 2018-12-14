const mongoose = require('mongoose');
const { Schema } = mongoose;  
const ValoracionSchema = new Schema({
    idarticulo:{type:String, required=true},
    puntuacion:{type:Number, required=true},
    cliente:{type:String , required=true},
    comentario:{type: String, required: false},
    fecha :{type: Date, required: true}
});
module.exports = mongoose.model('Valoracion', ValoracionSchema);