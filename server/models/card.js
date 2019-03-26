const mongoose = require('mongoose');
const { Schema } = mongoose;  
const CardSchema = new Schema({
    idEquipo: {type: String, required: true},
    urlImagen: {type: String, required: true},
    tipo: {type: String},
    activo: {type: Boolean},
});
module.exports = mongoose.model('Card', CardSchema);