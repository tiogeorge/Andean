import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { NgFlashMessageService } from 'ng-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private flashMessage: NgFlashMessageService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login(form?: NgForm){
    this.usuarioService.login(form.value).subscribe(res => {
      var sres = JSON.stringify(res);
      var jres = JSON.parse(sres);
      if(jres.estado){
        this.flashMessage.showFlashMessage({messages: ['Iniciando sesión'], timeout: 5000, dismissible: true, type: 'success'});
        this.router.navigate(['/']);
        this.usuarioService.setUsuarioLogeado(form.value);
      } else {
        this.flashMessage.showFlashMessage({messages: [jres.status], timeout: 5000,dismissible: true, type: 'danger'});
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
