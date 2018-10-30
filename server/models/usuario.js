const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  correo: {type: String, unique:true, required: true},
  nombres: {type: String, required: true},
  apellidos: {type: String, required: true},
  password: {type: String, required: true},
  fecha_afiliacion: {type: Date, default: Date.now}
});
usuarioSchema.indexes({correo: 1});

module.exports = mongoose.model('Usuario', usuarioSchema);