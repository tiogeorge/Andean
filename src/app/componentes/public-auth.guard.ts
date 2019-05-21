import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService} from './perfil-usuario/usuario.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublicAuthGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService,public router: Router ){

  }
  canActivate():Promise<boolean>{
    return this.getToken();    
  }
  async getToken(){
    if(this.usuarioService.existeToken()){
      return true;
    }else{      
      var token = await this.usuarioService.getPublicToken() as any;
      localStorage.setItem('pt',token.token);
      return true;
      
    }   
  }
}
