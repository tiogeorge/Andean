import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JitSummaryResolver } from '@angular/compiler';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
  ]
})

export class PerfilUsuarioComponent implements OnInit {
  usuarioService: UsuarioService;
  router: Router;
  tiposDocumento: string[];

  constructor(usuarioService: UsuarioService, router: Router, private adapter: DateAdapter<any>) {
    this.usuarioService = usuarioService;
    this.router = router;
    this.tiposDocumento = ['DNI'];
    this.adapter.setLocale('es');
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
