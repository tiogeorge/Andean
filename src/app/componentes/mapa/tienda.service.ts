import { catchError} from 'rxjs/operators';
import { Constantes } from '../constantes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tienda } from './tienda';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  tiendas          : Tienda[]   = [];
  tienda           : Tienda;
  private URL      : string     = Constantes.URL_API_TIENDA;

  constructor(private http: HttpClient) { 
    this.tienda = new Tienda();
  }

  postTienda(tienda: Tienda): Observable<any>{
    return this.http.post<Tienda>(this.URL, tienda, {withCredentials: true}).pipe(
      catchError(this.manejarError<Tienda>('postTienda'))
    );
  }

  getTiendas() : Observable<any>{
    return this.http.get<Tienda[]>(this.URL, {withCredentials: true}).pipe(
      catchError(this.manejarError('getTiendas',[]))
    );
  }

  putTienda(tienda: Tienda): Observable<any>{
    return this.http.put<Tienda>(this.URL + `/${tienda._id}`, tienda ,{withCredentials: true}).pipe(
      catchError(this.manejarError<any>('putTienda'))
    );
  }

  deleteTienda(_id: string): Observable<Tienda>{
    return this.http.delete<Tienda>(this.URL +  `/${_id}`, {withCredentials: true}).pipe(
      catchError(this.manejarError<any>('deleteTienda'))
    );
  }

  private manejarError<T> (operacion = 'operacion', resultado?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(resultado as T);
    };
  }

}
