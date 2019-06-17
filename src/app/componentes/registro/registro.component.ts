import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { Respuesta } from '../perfil-usuario/respuesta';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { Usuario } from '../perfil-usuario/usuario';
import { UsuarioService } from '../perfil-usuario/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})

export class RegistroComponent implements OnInit {

  constructor(public usuarioService: UsuarioService, public router: Router, public snackBar: MatSnackBar){}

  ngOnInit() {
    /*this.usuarioService.getUsuarioLogeado().subscribe( res => {
      const respuesta = res as Respuesta;
      if(respuesta.status){
        this.router.navigate(['/perfil-usuario']);
      }
    })*/
    if(this.usuarioService.logueado()){
      this.router.navigate(['/home']);
    }
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
   * Método que guarda los datos de un nuevo cliente
   * @param form : formulario con los datos del nuevo cliente
   */
  registrar(form?: NgForm){
    // Campos requeridos
    if(!this.usuarioService.validarUsuario(form.value)){
      this.openSnackBar(false, 'Por favor complete todos los datos requeridos');
      this.resetForm(form);
    }else{
      // Registro de Usuario
      this.usuarioService.registrarUsuario(form.value).subscribe(res => {
        const respuesta = res as Respuesta;
        if(respuesta.status){
          this.openSnackBar(respuesta.status, respuesta.msg);
          this.router.navigate(['/login']);
        } else {
          this.openSnackBar(respuesta.status, respuesta.error);
          this.resetForm(form)
        }
      });
   }
  }

  /**
   * Método que limpia los campos para almacenar a un nuevo cliente
   * @param form : formulario de registro
   */
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.usuarioService.usuarioSeleccionado = new Usuario();
    }
  }

}


