const mongoose = require('mongoose'),  
      Schema = mongoose.Schema;

const MensajeSchema = new Schema({  
  conversacionId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  cuerpo: {
    type: String,
    required: true
  },
  autor: {
    type: String
  },
  destino : {
    type: String
  }
},
{
  timestamps: true // Saves createdAt and updatedAt as dates. createdAt will be our timestamp.
});

module.exports = mongoose.model('Mensaje', MensajeSchema);  