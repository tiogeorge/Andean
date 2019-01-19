import { catchError} from 'rxjs/operators';
import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(public http: HttpClient) { }

  /**
   * Método para cerrar la sesión del usuario y eliminar su sesión
   */
  cerrarSesion(){
    return this.http.delete<any>(Constantes.URL_API_SESION, {withCredentials : true}).pipe(
      catchError(this.handleError<any>('deleteSesion'))
    );
  }

  /**
   * Método que inicia una nueva sesión
   */
  nuevaSesion(){
    return this.http.post<any>(Constantes.URL_API_SESION, localStorage, {withCredentials: true}).pipe(
      catchError(this.handleError<any>('postSesion'))
    );
  }

  /**
   * Método que obtiene los datos de la sesión iniciada
   */
  obtenerSesion(){
    return this.http.get<any>(Constantes.URL_API_SESION, { withCredentials: true }).pipe(
      catchError(this.handleError<any>('getSesion'))
    );
  }

  /**
   * Método que maneja los errores de los métodos
   * @param operation 
   * @param result 
   */
  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
