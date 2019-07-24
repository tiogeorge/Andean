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
    if(localStorage.getItem('session_token')){
      return this.verificarToken();
    }else{
      return this.getToken();    
    }
    
  }
  async verificarToken(){
    //console.log("ENTRANDO A GUARD");
    if(this.usuarioService.logueado()){
      if(this.usuarioService.esSessionTokenVigente()){
        return true;
      }else{ //VERIFICAR VIGENCIA DE REFRESH TOKEN Y SI ESTA VIGENTE ACTULIZAR SESION TOKEN
        if(this.usuarioService.esRefreshTokenVigente()){
          var newtoken = await this.usuarioService.getNewSessionToken() as any;
          localStorage.setItem('session_token',newtoken.newtoken);
          localStorage.setItem('session_token_exp', newtoken.exp_newtoken);
          //console.log(newtoken);
          return true;
        }else{
          // CERRAR SESION Y RECARGAR
          
          this.usuarioService.logout();
          location.reload();
          return true;
        }      
       
      }
    }else{
      return true;
    }

  }
  async getToken(){
    if(this.usuarioService.existeToken()){
      //console.log("SI TIENE TOKEN");
      if(this.usuarioService.esTokenPublicoVigente()){// SI EL TOKEN NO VENCIO
        //console.log("TOKEN ACTIVO");
        return true;
      }else{
        //console.log("TOKEN VENCIDO");
        var token = await this.usuarioService.getPublicToken() as any;
        localStorage.setItem('pt',token.token);
        localStorage.setItem('expires_pt',token.expires_pt);
        return true;
      }
    }else{ 
      //console.log("NO TIENE TOKEN");     
      var token = await this.usuarioService.getPublicToken() as any;
      localStorage.setItem('pt',token.token);
      localStorage.setItem('expires_pt',token.expires_pt);
      return true;
      
    }   
  }
}
