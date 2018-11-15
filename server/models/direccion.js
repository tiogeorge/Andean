const mongoose = require('mongoose');
const { Schema } = mongoose;

const direccionSchema = new Schema({
  usuario: { type: String },
  direccion: { type: String },
  manzana : { type : String },
  nroLote: { type: String},
  depInterior: { type: String },
  urbanizacion: { type: String },
  referencia: { type: String },
  departamento: { type: String },
  provincia: { type: String },
  distrito: { type: String},
});

module.exports = mongoose.model('Direccion', direccionSchema);