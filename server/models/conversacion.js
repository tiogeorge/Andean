const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const ConversacionSchema = new Schema({  
  nombreCliente: {type: String, required: true},
  email: {type: String, required: true},
  tipoConsulta: {type: String, required: true},
  consulta: {type: String, required: true},
  concluido: {type: Boolean, default: false},
  participantes : {type: [String], default: []}
},{
  timestamps: true
});

module.exports = mongoose.model('Conversacion', ConversacionSchema);  