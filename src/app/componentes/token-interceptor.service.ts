import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { UsuarioService } from './perfil-usuario/usuario.service'
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(public usuarioService: UsuarioService, public router : Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.usuarioService.getToken()}`
      }
    });
    return next.handle(tokenizedReq).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.status);
        if(error.status == 401){//No autorizado
          console.log("No esta autorizado para ver esta pagina");
          this.router.navigate(['/login']);
        }
        return throwError(error);
    }));; 
  }
}
