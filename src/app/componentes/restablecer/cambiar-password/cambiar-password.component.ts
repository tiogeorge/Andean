import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { MensajeService } from '../mensaje.service';
import { Respuesta } from '../../perfil-usuario/respuesta';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styles: []
})
export class CambiarPasswordComponent implements OnInit {

  constructor(public mensajeService: MensajeService, public snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
  }

  /**
   * Método para cambiar la contraseña de un usuario
   * @param form 
   */
  cambiarPassword(newPassword: string, repeatPassword: string){
    console.log(newPassword);
    if(newPassword != repeatPassword){
      this.openSnackBar(false, 'La contraseña no coincide en los campos anteriores');
    } else {
      const token = this.route.snapshot.paramMap.get('token')
      this.mensajeService.cambiarPassword({password: newPassword, token: token}).subscribe( res => {
        const respuesta = res as Respuesta;
        if(respuesta.status){
          this.openSnackBar(respuesta.status, respuesta.msg);
          this.router.navigate(['/login']);
        } else {
          this.openSnackBar(respuesta.status, respuesta.error);
        }
      });
    }  
  }

  /**
   * Método que muestra un Bar temporal para confirmar los mensajes de éxito y de error
   */
  openSnackBar(status: boolean, mensaje: string): void {
    var clase = status ? 'exito' : 'error';
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      panelClass: [clase],
      data: mensaje
    });
  }

}
