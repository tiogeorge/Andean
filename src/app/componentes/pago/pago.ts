export class Pago {
    constructor(_id='', idCarrito='', idUsuario='', Articulo=null,FechaCompra=new Date(),EstadoPago='',idDireccion='',idTipoPago='', Mensaje='',EstadoEnvio='',FechaEnvio=new Date(),FechaEntrega=new Date(),PrecioTotal='', NroTransaccion='',Documento=null,idVendedor=''){
        this._id=_id;
        this.idCarrito=idCarrito;
        this.idUsuario=idUsuario;
        this.Articulo=Articulo;
        this.FechaCompra=FechaCompra;
        this.EstadoPago=EstadoPago;
        this.idDireccion=idDireccion;
        this.idTipoPago=idTipoPago;
        this.Mensaje=Mensaje;
        this.EstadoEnvio=EstadoEnvio;
        this.FechaEnvio=FechaEnvio;
        this.FechaEntrega=FechaEntrega;
        this.PrecioTotal=PrecioTotal;
        this.NroTransaccion=NroTransaccion;
        this.Documento=Documento;
        this.idVendedor=idVendedor;
    }
    _id:string;
    idCarrito: string;
    idUsuario:string;
    Articulo:[{
        idArticulo: { type: String},
        PrecioUni: { type: String},
        idPlan: { type: String},
    }];
    FechaCompra:Date;
    EstadoPago:string;
    idDireccion:string;
    idTipoPago:string;
    Mensaje:string;
    EstadoEnvio:string;
    FechaEnvio:Date;
    FechaEntrega:Date;
    PrecioTotal:string;
    NroTransaccion:string;
    Documento:[{
        Tipo: { type: String},
        Serie: { type: String},
        Numero: { type: String},
    }];
    idVendedor: string;
}
