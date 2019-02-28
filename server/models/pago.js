const mongoose= require('mongoose');
const {Schema}=mongoose;

const pagoSchema= new Schema({
   // _id:{type:String,required:true},
    idUsuario:{type:String,required:true},
    Correocliente:{type:String,required:true},
    Articulo:[{
        idarticulo:{type: String},
        titulo:{type: String},
        url:{type: String},
        categoria:{type: String},
        marca:{type: String},
        cantidad:{type: String},
        idprecio:{type: String},
        imagen:{type: String},
        cuotainicial:{type: String},
        cuotamensual:{type: String},
        cuotas:{type: String},
        montomes:{type: String},
        nombreplan:{type: String},
        precio:{type: String},
        tipolinea:{type: String},
        tipoplan:{type: String}
        
    }],
  //  Articulo:{type: String, required:true},
    FechaCompra:{type:Date},
    EstadoPago:{type:String, required:true},
    idDireccion:{type:String, required:true},
    idTipoPago:{type:String, required:true},
    //Mensaje:{type:String},
    NroPedido:{type:String},
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