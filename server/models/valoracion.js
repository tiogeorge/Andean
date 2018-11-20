const mongoose = require('mongoose');
const { Schema } = mongoose;  
const ValoracionSchema = new Schema({
    puntuacion:{type:Number, required=true},
    cliente:{type:String , required=true},
    comentario:{type: String, required: false},
    fecha :{type: Date, required: true}
});
module.exports = mongoose.model('Valoracion', ValoracionSchema);