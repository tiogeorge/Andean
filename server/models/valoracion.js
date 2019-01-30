const mongoose = require('mongoose');
const { Schema } = mongoose;  
const valoracionSchema = new Schema({
    idarticulo:{type:String, required:true    },
    puntuacion:{type:Number, required:true    },
    cliente:   {type:String, required:true    },
    nombrecliente: {type:String, required:true    },
    comentario:{type:String, required:true    },
    fecha:     {type:Date  , default: Date.now}
});
module.exports = mongoose.model('Valoracion', valoracionSchema);