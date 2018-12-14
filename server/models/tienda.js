const mongoose = require('mongoose');
const { Schema } = mongoose;

const tiendaSchema = new Schema({
  nombre: { type: String, required: true},
  latitud: { type: String, required: true},
  longitud: { type: String, required: true}
});

module.exports = mongoose.model('Tienda', tiendaSchema);