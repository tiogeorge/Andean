import { Component } from '@angular/core';
import { Usuario } from './componentes/perfil-usuario/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  cliente: Usuario;
  estaLogeado: boolean = false;

  logIn(componente: any){
    if(componente.usuarioService != null){
      this.estaLogeado = componente.usuarioService.estaLogeado ? componente.usuarioService.estaLogeado : false;
      if(this.estaLogeado){
        this.cliente = componente.usuarioService.usuarioLogeado;
      }
    }
  }
}
