const mongoose = require('mongoose');
const { Schema } = mongoose;

const direccionSchema = new Schema({
  usuario: { type: String },
  direccion: { type: String },
  nroLote: { type: String},
  depInterior: { type: String },
  urbanizacion: { type: String },
  departamento: { type: String },
  provincia: { type: String },
  distrito: { type: String},
  direccion_predeterminada: { type: Boolean }
});

module.exports = mongoose.model('Direccion', direccionSchema);