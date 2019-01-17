const mongoose= require('mongoose');
const {Schema}=mongoose;

const pagoSchema= new Schema({
    idUsuario:{type:String,required:true},
    Articulo:[{
        idArticulo:{type: String},
        PrecioUni:{type: String},
        idPlan:{type:String},
    }],
  //  Articulo:{type: String, required:true},
    FechaCompra:{type:Date},
    EstadoPago:{type:String, required:true},
    idDireccion:{type:String, required:true},
    idTipoPago:{type:String, required:true},
    Mensaje:{type:String},
    EstadoEnvio:{type:String, required:true},
    FechaEnvio:{type:Date},
    FechaEntrega:{type:Date},
    PrecioTotal:{type:String,required:true},
    NroTransaccion:{type:String,required:true},
    Documento:[{
        Tipo:{type: String},
        Serie:{type: String},
        Numero:{type: String},
    }],
    idVendedor:{type: String, required:true},
});

module.exports = mongoose.model('Pago',pagoSchema);