export class Valoracion {
    constructor( cliente = '' , nombrecliente = '', comentario = ''  , puntuacion =  0 , fecha = new Date()){
        this.cliente = cliente;
        this.nombrecliente = nombrecliente;
        this.comentario = comentario;
        this.puntuacion = puntuacion;
        this.fecha = fecha;
    }
    cliente: string;
    nombrecliente : string;
    comentario: string;
    puntuacion: Number;
    fecha:Date;
  }