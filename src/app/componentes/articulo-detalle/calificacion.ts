export class Calificacion {
    constructor( usuario = '' , comentario = '', valoracion =  0 , fecha = new Date()){
    }
  
    usuario: string;
    comentario: string;
    valoracion: Number;
    fecha:Date;
  }