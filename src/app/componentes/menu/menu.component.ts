import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { Usuario } from '../perfil-usuario/usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [UsuarioService]
})
export class MenuComponent implements OnInit {

  @Input() estaLogeado: boolean = false;
  @Input() cliente: Usuario;
  nombre_tienda : string = 'Andean Store';
  usuarioService: UsuarioService;

  constructor() { 
  }

  ngOnInit() {
  }

}
