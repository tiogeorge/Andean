import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../perfil-usuario/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  usuarioService: UsuarioService;
  flashMessage: NgFlashMessageService;
  router: Router;

  constructor(usuarioService: UsuarioService, flashMessage: NgFlashMessageService, router: Router) { 
    this.usuarioService = usuarioService;
    this.flashMessage = flashMessage;
    this.router = router;
  }

  ngOnInit() {
  }

  login(form?: NgForm){
    this.usuarioService.login(form.value).subscribe(res => {
      var jres = JSON.parse(JSON.stringify(res));
      if(jres.status){
        this.flashMessage.showFlashMessage({messages: [jres.msg], timeout: 5000, dismissible: true, type: 'success'});
        this.router.navigate(['/perfil-usuario']);       
      } else {
        this.flashMessage.showFlashMessage({messages: [jres.error], timeout: 5000,dismissible: true, type: 'danger'});
        this.resetForm(form)
      }
    });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.usuarioSeleccionado = new Usuario();
    }
  }
}
