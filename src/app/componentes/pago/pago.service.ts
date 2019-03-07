import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pago } from './pago';
import { Direccion } from './direccion';

export class creditCard{
  number: string;
  securityCode: string;
  mesExp: string;
  yearExp: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  tarjeta : creditCard = new creditCard();
  selectPago: Pago;
  pago: Pago[];

  constructor(public http: HttpClient) { 
    this.selectPago = new Pago();
  }
  
  GuardarPago(pago:Pago){
    return this.http.post(Constantes.URL_API_PAGO, pago, {withCredentials: true});
  }
  
  recuperarserie(){
    return this.http.get(Constantes.URL_API_PAGO + '/serielocal/serie', {withCredentials: true})
  }

  recuperarnumerodoc(){
    return this.http.get(Constantes.URL_API_PAGO + '/numerodoc/numero', {withCredentials: true})
  }

  procesarPago(direccion : Direccion){
    return this.http.post(Constantes.URL_PASARELA + '/crearPago', {tarjeta: this.tarjeta, direccion: direccion}, {withCredentials: true});
  }

  recuperarpedidocorreo(correo:string){
    return this.http.get(Constantes.URL_API_PAGO + '/pedidos/cliente/' + correo, { withCredentials: true});
  }
}
