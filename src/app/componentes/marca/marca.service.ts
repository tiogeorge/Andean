import { Marca } from './marca';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constantes } from '../constantes';


@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  http: HttpClient;
  selecmarca:Marca;
  marca:Marca[];
  urlmarca=Constantes.URL_API_MARCA
  constructor(http:HttpClient) {
    this.http=http;
   }

   listarMarcas(id:string){
    return this.http.get(Constantes.URL_API_MARCA+`/marc/` + id);
   }
}
