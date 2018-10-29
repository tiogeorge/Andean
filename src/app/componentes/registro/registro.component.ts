import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})

export class RegistroComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  registrar(form?: NgForm){
    // Campos requeridos
    if(!this.usuarioService.validarUsuario(form.value)){
      this.flashMessage.show('Por favor, rellene todos los campos', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    // Verificar si existe el correo
    
    // Registro de Usuario
    this.usuarioService.registrarUsuario(form.value).subscribe(res => {
      console.log(res);
      /*if(exito){
        this.flashMessage.show('Su registro se realizó con éxito', {cssClass: 'alert-success', timeout: 5000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Algo produjo un error', {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/registrar']);
      }*/
    });
  }

}


