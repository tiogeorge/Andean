import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs'
import { Usuario}  from '../componentes/perfil-usuario/usuario';

@Injectable({
    providedIn: 'root'
  })
  export class comunicacionService {  
 
    subjectUsuario = new Subject<any>();
    subjectPedirUsuario = new Subject<any>();
    subjectCategorias = new Subject<any>();
    subjectChat = new Subject<any>();
    subjectUsuarioValoracion = new Subject<any>();
    constructor() {
    }
    enviarUsuario(usuario: any) { 
      this.subjectUsuario.next(usuario);
    }
    enviarUsuarioValoracion(usuario: any) { 
      this.subjectUsuarioValoracion.next(usuario);
    }
    pedirUsuario(){
      this.subjectPedirUsuario.next();
    }
    enviarCategorias(cat: any){
      this.subjectCategorias.next(cat);
    }
    /*limpiarMensaje() {
        this.subject.next();
    }*/
    getUsuario(): Observable<any> {
        return this.subjectUsuario.asObservable();
    }
    
    getUsuarioValoracion():Observable<any>{
      return this.subjectUsuarioValoracion.asObservable();
    }
    getCategorias(): Observable<any>{
      return this.subjectCategorias.asObservable();
    }
    atenderPedidoUsuario(){
      return this.subjectPedirUsuario.asObservable();
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
  