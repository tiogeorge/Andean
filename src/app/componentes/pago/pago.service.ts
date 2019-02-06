import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Pago} from './pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
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
    return this.http.get(this.URL_API+'/serielocal')
  }
  recuperarnumerodoc(){
    return this.http.get(this.URL_API+'/numerodoc/numero')
  }
}
