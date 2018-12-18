import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Constantes} from '../constantes'
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaSeleccionada: Categoria = new Categoria();
  //categorias: Categoria[];
  categoria:Categoria[];
  constructor(private http: HttpClient) {
    this.categoriaSeleccionada = new Categoria();
  }

  listarcategoria(id:string){
    return this.http.get(Constantes.URL_API_CATEGORIA+'/categoriaart/'+id);
  }
  
}
