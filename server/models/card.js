const mongoose = require('mongoose');
const { Schema } = mongoose;  
const CardSchema = new Schema({
    idEquipo: {type: String, required: true},
    urlImagen: {type: String, required: true},
    tipo: {type: String},
    link: {type: String},
    activo: {type: Boolean},
    linea: {type: String},
    tipoPlan: {type: String},
    cuotas: {type: String},
    plan: {type: String},
    idPrecio: {type: String},
    orden: {type: Number}
});
module.exports = mongoose.model('Card', CardSchema);