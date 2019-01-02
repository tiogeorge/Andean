import { Constantes } from '../constantes';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario';
import { catchError} from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
  public usuarioSeleccionado: Usuario;
  public usuarios: Usuario[];
  readonly URL_API = Constantes.URL_API_USUARIO;

  constructor(private http: HttpClient) { 
    this.usuarioSeleccionado = new Usuario();
  }

  agregarArticuloCarrito(urlArticulo: string){
    return this.http.put(this.URL_API + `/carrito/${urlArticulo}`,{ url: urlArticulo },{withCredentials: true}).pipe(
      catchError(this.handleError<any>('putArticulo'))
    );
  }

  eliminarArticuloCarrito(urlArticulo: string) {
    return this.http.delete(this.URL_API + `/carrito/${urlArticulo}`, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('eliminarArticulo'))
    );
  }

  eliminarArticulosCarrito(){
    return this.http.delete(this.URL_API + `/carrito`, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('eliminarArticulos'))
    );
  }
  
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario, { withCredentials : true });
  }

  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == "" || usuario.nombres == "" || usuario.password == "" || usuario.correo == ""){
        return false;
      } else {
        return true;
      }
  }

  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario,{ withCredentials: true });
  }

  getUsuarioLogeado() {
  	return this.http.get(this.URL_API + '/cliente' , { withCredentials: true });
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('putUsuario'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
