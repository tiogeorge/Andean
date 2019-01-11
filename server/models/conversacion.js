const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const ConversacionSchema = new Schema({  
  nombreCliente: {type: String, required: true},
  email: {type: String, required: true},
  tipoConsulta: {type: String, required: true},
  consulta: {type: String, required: true}
},{
  timestamps: true
});

module.exports = mongoose.model('Conversacion', ConversacionSchema);  