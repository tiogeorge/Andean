const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  correo: {type: String, required: true},
  tipo_documento: {type: String},
  numero_documento: {type: String},
  nombres: {type: String, required: true},
  apellidos: {type: String, required: true},
  contrasena: {type: String, required: true},
  fecha_afiliacion: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Usuario', usuarioSchema);