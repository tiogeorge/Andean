import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs'
import { Usuario}  from '../componentes/perfil-usuario/usuario';

@Injectable({
    providedIn: 'root'
  })
  export class comunicacionService {  
 
    subject = new Subject<any>();
    subjectCategorias = new Subject<any>();
    subjectChat = new Subject<any>();
    constructor() {
    }
    enviarUsuario(usuario: any) { 
      this.subject.next(usuario);
    }
    enviarCategorias(cat: any){
      this.subjectCategorias.next(cat);
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
    getCategorias(): Observable<any>{
      return this.subjectCategorias.asObservable();
    }
    enviarCerrarSesion(){
      this.subject.next("CERRAR");
    }
    abrirChat(){
      this.subjectChat.next("ABRIR");
    }
    cerrarChat(){
      this.subjectChat.next("CERRAR");
    }
    getAccionChat(){
      return this.subjectChat.asObservable();
    }
  }
  