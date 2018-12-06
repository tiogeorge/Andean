import { Direccion} from './direccion';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {
  selecDireccion:Direccion;
  direccion:Direccion[];
  readonly URL_API = 'http://localhost:3000/api/dir';

  constructor(private http: HttpClient) {
    this.selecDireccion=new Direccion();
   }

   AgregarDireccion(Direccion:Direccion){
     return this.http.post(this.URL_API,Direccion);
   }
   
   ListarDireccion(){
     return this.http.get(this.URL_API);
   }
   EliminarDireccion(_id:string){
     return this.http.delete(this.URL_API +  `/${_id}`);
   }

}
