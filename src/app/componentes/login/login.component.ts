import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { Respuesta } from '../perfil-usuario/respuesta';
import { Router } from '@angular/router';
import { Usuario } from '../perfil-usuario/usuario';
import { UsuarioService } from '../perfil-usuario/usuario.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import {comunicacionService} from '../comunicacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, 
              public router: Router, 
              public snackBar: MatSnackBar, 
              public comService: comunicacionService,
              public titleService: Title,
              public metaService: Meta) { }

  ngOnInit() {
    this.titleService.setTitle('Inicio de Sesión | Smarket');
    this.metaService.updateTag({name: 'description', content: 'Inicia sesión en la tienda virtual SMARKET y accede a todos los beneficios que tiene para comprar.'})
    this.usuarioService.getUsuarioLogeado().subscribe( res => {
      const respuesta = res as Respuesta;
      if(respuesta.status){
        this.router.navigate(['/perfil-usuario']);
      }
    });
  }

  /**
   * Método que permite iniciar sesión
   * @param form : correo y contraseña del cliente
   */
  login(form?: NgForm){
    this.usuarioService.login(form.value).subscribe(res => {
      const respuesta = res as Respuesta;
      if(respuesta.status){
        this.openSnackBar(respuesta.status, respuesta.msg);        
        this.comService.enviarUsuario(respuesta.user);
        console.log("ENVIANDO A USUARIO");
        this.router.navigate(['/perfil-usuario']);       
      } else {
        this.openSnackBar(respuesta.status, respuesta.error);
        this.resetForm(form)
      }
    });
  }
  

  /**
   * Método que muestra un Bar temporal para confirmar los mensajes de éxito y de error
   */
  openSnackBar(status: boolean, mensaje: string): void {
    var clase = status ? 'exito' : 'error';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 1500,
      panelClass: [clase],
      data: mensaje
    });
  }

  /**
   * Método que reinicia un formulario
   * @param form : formulario a resetear
   */
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.usuarioSeleccionado = new Usuario();
    }
  }
}
