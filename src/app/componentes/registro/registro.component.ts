import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../servicios/usuario/usuario.service';
import { NgForm } from '@angular/forms';

declare var M: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {

  constructor(private servicioUsuario: UsuarioService) { }

  ngOnInit() {
  }

  registrar(form?: NgForm){
    console.log(form.value);
    this.servicioUsuario.post(form.value).subscribe(res => {
      console.log('guardado');
    });
  }

}


