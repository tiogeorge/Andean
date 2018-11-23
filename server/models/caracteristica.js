const mongoose = require('mongoose');
const { Schema } = mongoose;

const caracteristicaSchema = new Schema ({
  nombre : { type: String},
  medida : { type: String}
});

module.exports = mongoose.model('Caracteristica', caracteristicaSchema);