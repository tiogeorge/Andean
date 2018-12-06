export class Direccion {
    constructor(_id='',usuario='',departamento='',provincia='',distrito='',direccion='',tipolocal='',referencia='',telefono=''){
        this._id=_id;
        this.usuario=usuario;
        this.departamento=departamento;
        this.provincia=provincia;
        this.distrito=distrito;
        this.direccion=direccion;
        this.tipolocal=tipolocal;
        this.referencia=referencia;
        this.telefono=telefono;
    }

    _id:string;
    usuario: string;
    departamento: string;
    provincia: string;
    distrito: string;
    direccion: string;
    tipolocal:string;
    referencia: string;
    telefono:string;
}
