const mongoose = require('mongoose');
const { Schema } = mongoose;

const tiendaSchema = new Schema({
  nombre: { type: String, required: true},
  latitud: { type: Number, required: true},
  longitud: { type: Number, required: true}
});

module.exports = mongoose.model('Tienda', tiendaSchema);