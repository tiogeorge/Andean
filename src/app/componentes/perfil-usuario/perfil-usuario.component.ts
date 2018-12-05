import { Component, OnInit } from '@angular/core';
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
  router: Router

  constructor(usuarioService: UsuarioService, router: Router) {
    this.usuarioService = usuarioService;
    this.router = router;
   }

  ngOnInit() {
    var token = localStorage.getItem("_tk");
    this.usuarioService.getUsuarioLogeado(token).subscribe(res =>{
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.usuario = jres.data as Usuario;
        //console.log(jres.data);
      }else{
        this.router.navigate(['/']);
      }
    });
  }

}
