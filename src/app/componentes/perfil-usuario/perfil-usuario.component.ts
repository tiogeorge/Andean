import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuarioService: UsuarioService;
  usuario: Usuario;
  router: Router;
  tiposDocumento: string[];

  constructor(usuarioService: UsuarioService, router: Router) {
    this.usuarioService = usuarioService;
    this.router = router;
    this.tiposDocumento = ['DNI'];
   }

  ngOnInit() {
    this.usuarioService.getUsuarioLogeado(localStorage.getItem("_tk")).subscribe(res =>{
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.usuario = jres.data as Usuario;
      }else{
        this.router.navigate(['/']);
      }
    });
  }

}
