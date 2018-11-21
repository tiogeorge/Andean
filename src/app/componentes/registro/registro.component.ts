import { Component, OnInit } from '@angular/core';
import { NgFlashMessageService } from 'ng-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario';
import { UsuarioService } from '../../servicios/usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})

export class RegistroComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) 
  { }

  ngOnInit() {
  }

  registrar(form?: NgForm){
    // Campos requeridos
    if(!this.usuarioService.validarUsuario(form.value)){
      this.flashMessage.showFlashMessage({messages: ['Por favor Complete los campos'], timeout: 5000, dismissible: true ,type: 'danger'});
      this.resetForm(form);
    }else{
      // Registro de Usuario
      this.usuarioService.registrarUsuario(form.value).subscribe(res => {
        var sres = JSON.stringify(res);
        var jres = JSON.parse(sres);
        if(jres.status){
          this.flashMessage.showFlashMessage({messages: jres.msg, timeout: 5000, dismissible: true, type: 'success'});
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.showFlashMessage({messages: jres.error, timeout: 5000,dismissible: true, type: 'danger'});
          this.resetForm(form)
        }
      });
   }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.usuarioSeleccionado = new Usuario();
    }
  }

}


