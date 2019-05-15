import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService} from './perfil-usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService,public router: Router ){

  }
  canActivate():boolean{
    console.log("ENTRANDO A GUARD");
    if(this.usuarioService.logueado()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
