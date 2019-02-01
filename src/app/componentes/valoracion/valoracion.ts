export class Valoracion {
    constructor( _id= '' ,cliente = '' , nombrecliente = '', comentario = ''  , puntuacion =  0 , fecha = new Date()){
        this._id = _id;
        this.cliente = cliente;
        this.nombrecliente = nombrecliente;
        this.comentario = comentario;
        this.puntuacion = puntuacion;
        this.fecha = fecha;
    }
    _id: string;
    cliente: string;
    nombrecliente : string;
    comentario: string;
    puntuacion: Number;
    fecha:Date;
  }