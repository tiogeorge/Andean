import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriaSeleccionada       : Categoria = new Categoria();
  categorias                  : Categoria[];
  readonly URL_API = Constantes.URL_API_CATEGORIA;


  constructor(private http: HttpClient) {
    this.categoriaSeleccionada = new Categoria();
  }

  getCategoria(id: string) {
    return this.http.get(this.URL_API + '/' + id, {withCredentials: true});
  }

  getCategorias(){
    return this.http.get(this.URL_API, {withCredentials: true});
  }

  getSubCategorias(id: string){
    return this.http.get(this.URL_API+'/subcategorias/'+id, {withCredentials: true})
  }

  postCategoria(Categoria: Categoria){
    return this.http.post(this.URL_API,Categoria, {withCredentials: true});
  }
  
  putCategoria(categoria: Categoria){
    return this.http.put(this.URL_API+'/'+categoria._id,categoria, {withCredentials: true});
  }
  
  deleteCategoria(id: string){
    return this.http.delete(this.URL_API+'/'+id, {withCredentials: true});
  }
}
