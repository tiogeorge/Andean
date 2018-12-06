import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JitSummaryResolver } from '@angular/compiler';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  usuarioService: UsuarioService;
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
        this.usuarioService.usuarioSeleccionado = jres.data;
      }else{
        this.router.navigate(['/']);
      }
    });
  }

  actualizar(){
    this.usuarioService.putUsuario(this.usuarioService.usuarioSeleccionado).subscribe(res =>{
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){

      }else {

      }
    });
  }

}
