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

  constructor(public http: HttpClient) { 
    this.usuarioSeleccionado = new Usuario();
  }

  /**
   * Método que agrega un artículo en el carrito de compras
   * @param urlArticulo : identificador de un artículo
   * @param plan : plan seleccionado del artículo
   */
  agregarArticuloCarrito(urlArticulo: string, plan: any, idequipo:string, cantidad: number, imagen: string){
    const articulo = {
      url: urlArticulo,
      tipoLinea: plan.tipolinea,
      tipoPlan: plan.tipoplan,
      nombrePlan: plan.nombreplan,
      cuotas : plan.cuotas,
      idequipo: idequipo,
      cantidad: cantidad,
      imagen: imagen
      
    };
    return this.http.put(this.URL_API + `/carrito/${urlArticulo}`, articulo,{withCredentials: true}).pipe(
      catchError(this.handleError<any>('agregartArticulo'))
    );
  }

  /**
   * Método para eliminar un artículo del carrito de compras
   * @param urlArticulo : identificador del artículo
   */
  eliminarArticuloCarrito(urlArticulo: string) {
    return this.http.delete(this.URL_API + `/carrito/${urlArticulo}`, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('eliminarArticulo'))
    );
  }

  /**
   * Método que elimina todos los artículos de un carrito de compras
   */
  eliminarArticulosCarrito(){
    return this.http.delete(this.URL_API + `/carrito`, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('eliminarArticulos'))
    );
  }

  /**
   * Método que devuelve los datos de un usuario que ha iniciado sesión
   */
  getUsuarioLogeado() {
  	return this.http.get(this.URL_API + '/cliente' , { withCredentials: true });
  }

  /**
   * Método que guarda el costo de envío en la sesión del cliente
   * @param envio : JSON que contiene el costo de envío
   */
  guardarCostoEnvio(envio: any){
    return this.http.post(this.URL_API + '/envio', envio, {withCredentials: true});
  }
  
  /**
   * Método que verifica el cliente y su contraseña para ingresar a su cuenta
   * @param usuario : datos del cliente para iniciar sesión
   */
  login(usuario: Usuario){
    return this.http.post(this.URL_API + '/login',usuario,{ withCredentials: true });
  }

  /**
   * Método que actualiza la información de un cliente
   * @param usuario 
   */
  putUsuario(usuario: Usuario) {
    return this.http.put(this.URL_API + `/${usuario._id}`, usuario, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('putUsuario'))
    );
  }

  /**
   * Método que guarda los datos de un usuario nuevo en la base de datos
   * @param usuario 
   */
  registrarUsuario(usuario: Usuario){
    return this.http.post(this.URL_API, usuario, { withCredentials : true });
  }

  /**
   * Valida los datos del formulario de registro
   * @param usuario : datos del nuevo cliente
   */
  validarUsuario(usuario: Usuario){
    if(usuario.apellidos == "" || usuario.nombres == "" || usuario.password == "" || usuario.correo == ""){
      return false;
    } else {
      return true;
    }
  }

  /**
   * Método que maneja los errores en los observables
   * @param operation : operación en la que ocurre el error
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
