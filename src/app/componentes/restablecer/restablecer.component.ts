import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MensajeService } from './mensaje.service';
import { Respuesta } from '../perfil-usuario/respuesta';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.component.html',
  styleUrls: ['./restablecer.component.css']
})
export class RestablecerComponent implements OnInit {

  constructor(public mensajeService: MensajeService, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  recuperarPassword(email: string){
    const mensaje = {
      asunto: 'Recuperación de Contraseña',
      email: email
    };
    this.mensajeService.enviarMensaje(mensaje).subscribe( res => {
      const respuesta = res as Respuesta;
      if (respuesta.status){
        this.openSnackBar(respuesta.status, respuesta.msg);
      } else {
        this.openSnackBar(respuesta.status, respuesta.error);
      }
    });
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
