import { Component } from '@angular/core';
import { UsuarioService} from './componentes/perfil-usuario/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public usuarioService: UsuarioService){

  }
  ngOnInit() {

  }
  
}
