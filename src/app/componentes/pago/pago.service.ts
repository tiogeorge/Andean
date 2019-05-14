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
  cvv: string;
}
export class arregloart{
  id:string;
  idarticulo:string;
  cantidad:string;
}

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  tarjeta : creditCard = new creditCard();
  selectPago: Pago;
  pago: Pago[];
  actualizarart:any[]=new Array();//= new arregloart();

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

  procesarPago(idToken: string, email : string, precioTotal: any){
    return this.http.post(Constantes.URL_PASARELA + '/crearPago', {token: idToken, email: email, precio: precioTotal * 100}, {withCredentials: true});
  }

  recuperarpedidocorreo(correo:string){
    return this.http.get(Constantes.URL_API_PAGO + '/pedidos/cliente/' + correo, { withCredentials: true});
  }
  actualizarartcan(arr:arregloart){
    return this.http.put(Constantes.URL_API_PAGO + '/cantidad'+ `/${arr.id}`, arr);
  }
}
