const mongoose = require('mongoose');
const { Schema } = mongoose;

const direccionSchema = new Schema({
  usuario: { type: String },
  departamento: { type: String },
  provincia: { type: String },
  distrito: { type: String},
  direccion: { type: String },
  tipolocal:{type:String},
  referencia: { type: String },
  telefono:{type:String},
});

module.exports = mongoose.model('Direccion', direccionSchema);