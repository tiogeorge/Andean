import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs'
import { Usuario}  from '../componentes/perfil-usuario/usuario';

@Injectable({
    providedIn: 'root'
  })
  export class comunicacionService {  
 
    subject = new Subject<any>();
    constructor() {
    }
    enviarUsuario(usuario: any) { 
      this.subject.next(usuario);
    }
    limpiarMensaje() {
        this.subject.next();
    }
    getUsuario(): Observable<any> {
        return this.subject.asObservable();
    }
    inicioSesion(): Observable<any> {
        return this.subject.asObservable();
    }
    enviarCerrarSesion(){
      this.subject.next("CERRAR");
    }
  }
  