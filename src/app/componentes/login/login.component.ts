import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class LoginComponent implements OnInit, OnDestroy {
  usuarioService: UsuarioService;
  flashMessage: NgFlashMessageService;
  router: Router;

  constructor(
  ) { }

  ngOnInit() {
  }

  login(form?: NgForm){
    this.usuarioService.login(form.value).subscribe(res => {
      var sres = JSON.stringify(res);
      var jres = JSON.parse(sres);
      if(jres.status){
        this.flashMessage.showFlashMessage({messages: jres.msg, timeout: 5000, dismissible: true, type: 'success'});
        this.usuarioService.estaLogeado = true;
        this.usuarioService.setUsuarioLogeado(form.value);
        this.router.navigate(['/']);       
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

  ngOnDestroy(){
    var logvar = 'Luis se gue a su casa';
  }
}
