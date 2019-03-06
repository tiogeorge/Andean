import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Pago} from './pago';

export class creditCard{
  number: string;
  securityCode: string;
  expirationDate: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  tarjeta : creditCard = new creditCard();
  selectPago:Pago;
  pago:Pago[];
  readonly URL_API=Constantes.URL_API_PAGO;

  constructor(private http: HttpClient) { 
    this.selectPago=new Pago();
  }
  
  GuardarPago(pago:Pago){
    return this.http.post(this.URL_API,pago, {withCredentials: true});
  }
  
  recuperarserie(){
    return this.http.get(this.URL_API+'/serielocal/serie')
  }
  recuperarnumerodoc(){
    return this.http.get(this.URL_API+'/numerodoc/numero')
  }
  procesarPago(token: string){
    return this.http.post(Constantes.URL_PASARELA + '/crearCargo', {tokenId: token}, {withCredentials: true});
  }
  recuperarpedidocorreo(correo:string){
    return this.http.get(this.URL_API+'/pedidos/cliente/'+correo);
  }
}
