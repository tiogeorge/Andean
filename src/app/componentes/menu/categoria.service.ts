import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  categoriaSeleccionada       : Categoria = new Categoria();
  categorias                  : Categoria[];
  readonly URL_API = 'http://localhost:3000/api/categorias';


  constructor(private http: HttpClient) {
    this.categoriaSeleccionada = new Categoria();
  }

  getCategorias(){
    return this.http.get(this.URL_API)
  }

  getSubCategorias(id: string){
    return this.http.get(this.URL_API+'/subcategorias/'+id)
  }

  postCategoria(Categoria: Categoria){
    return this.http.post(this.URL_API,Categoria);
  }
  
  putCategoria(categoria: Categoria){
    return this.http.put(this.URL_API+'/'+categoria._id,categoria);
  }
  
  deleteCategoria(id: string){
    return this.http.delete(this.URL_API+'/'+id);
  }
}
