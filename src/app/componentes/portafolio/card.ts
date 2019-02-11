export class Card {
    constructor(_id=null,idEquipo='',urlImagen='',tipo='',link='',activo=true,linea='',tipoPlan='',cuotas='',plan='',idPrecio=''){
        this._id=_id;
        this.idEquipo=idEquipo;
        this.urlImagen=urlImagen;
        this.tipo=tipo;
        this.link=link;
        this.activo=activo;
        this.linea=linea;
        this.tipoPlan=tipoPlan;
        this.cuotas=cuotas;
        this.plan=plan;
        this.idPrecio=idPrecio;
    }
    _id: string;
    idEquipo: string;
    urlImagen: string;
    tipo: string;
    link: string;
    activo: boolean;
    linea: string;
    tipoPlan: string;
    cuotas: string;
    plan: string;
    idPrecio: string;
}
