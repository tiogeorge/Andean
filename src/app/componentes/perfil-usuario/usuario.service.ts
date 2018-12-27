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

  public estaLogeado : boolean;
  public usuarioLogeado: Usuario;
  public usuarioSeleccionado: Usuario;
  public usuarios: Usuario[];
  readonly URL_API = Constantes.URL_API_USUARIO;

  constructor(private http: HttpClient) { 
    this.estaLogeado = false;
    this.usuarioSeleccionado = new Usuario();
  }

  agregarArticuloCarrito(urlArticulo: string, token: any){
    return this.http.put(this.URL_API + `/carrito/${urlArticulo}`, token).pipe(
      catchError(this.handleError<any>('putArticulo'))
    );
  }
  
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario);
  }

  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == "" || usuario.nombres == "" || usuario.password == "" || usuario.correo == ""){
        return false;
      } else {
        return true;
      }
  }

  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario);
  }

  getUsuarioLogeado(token: string) {
  	return this.http.get(this.URL_API + '/' + token);
  }

  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario).pipe(
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
