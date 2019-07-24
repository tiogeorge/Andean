import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService} from './perfil-usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService,public router: Router ){

  }
  canActivate():Promise<boolean>{
    return this.verificarToken();
  }
  async verificarToken(){
    //console.log("ENTRANDO A GUARD");
    if(this.usuarioService.logueado()){
      if(this.usuarioService.esSessionTokenVigente()){
        //console.log("TOKEN SIGUE ACTIVO");
        return true;
      }else{ //VERIFICAR VIGENCIA DE REFRESH TOKEN Y SI ESTA VIGENTE ACTULIZAR SESION TOKEN
        if(this.usuarioService.esRefreshTokenVigente()){
          var newtoken = await this.usuarioService.getNewSessionToken() as any;
          //console.log("NUEVO TOKEN ACTUALIDADO");
          //console.log(newtoken);
          localStorage.setItem('session_token',newtoken.newtoken);
          localStorage.setItem('session_token_exp', newtoken.exp_newtoken);
          return true;
        }else{
          this.usuarioService.logout();
          this.router.navigate(['/login']);
        }      
       
      }
    }else{
      this.usuarioService.logout();
      this.router.navigate(['/login']);
      return false;
    }

  }
}
